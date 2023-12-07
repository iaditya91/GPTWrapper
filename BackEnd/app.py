from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile, Depends, HTTPException,Request
import openai,json, uvicorn,asyncio
from openai import OpenAI
from pydantic import BaseModel
from PyPDF2 import PdfReader
import jwt
from fastapi.responses import StreamingResponse
from reportlab.pdfgen import canvas
from io import BytesIO
from datetime import datetime, timedelta
from passlib.hash import bcrypt  # Install passlib with: pip install passlib
import fastapi
app = FastAPI()

# Assuming you have a secret key for JWT signing
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"


# CORS settings to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://1461-2601-19b-b00-26d0-8c6a-a6a9-1f4e-58d3.ngrok-free.app:3000","https://84.239.48.142:0","https://10.0.0.246:0","2601:8c:4302:45e0:8d1a:45aa:746a:6f77"],  # Adjust this based on your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory user database (replace this with a database in a production environment)
users_db = {
    "teacher": {
        "user": "teacher",
        "pwd": "teacher",
        "role": "teacher",
    },
    "student": {
        "user": "student",
        "pwd": "student",
        "role": "student",
    },
    "admin": {
        "user": "admin",
        "pwd": "admin",
        "role": "admin",
    }
}


# OAuth2PasswordBearer for handling token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/hello")
async def read_root():
    return {"message": "Hello, this is a test endpoint!"}


# Function to authenticate and get the current user
def get_current_user(token: str = Depends(oauth2_scheme)):
    if token not in users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return users_db[token]

####signup
class UserSignup(BaseModel):
    user: str
    pwd: str
    role: str


@app.post("/signup")
async def signup(signup_data: UserSignup):
    print(signup_data)
    # Check if the user already exists
    if signup_data.user in users_db:
        raise HTTPException(status_code=400, detail="User already exists")

    # # Hash the password using bcrypt (for better security)
    # hashed_password = bcrypt.hash(signup_data.pwd)

    # Save the user information (including hashed password) to the database
    users_db[signup_data.user] = {
        "pwd": signup_data.pwd,
        "role": signup_data.role
    }

    # print("Sucessfully Registered!!! Congrats!!")
    return "Sucessfully Registered!!! Congrats!"

########## login
class LoginRequest(BaseModel):
    user: str
    pwd: str

@app.post("/auth")
async def login(login_data: LoginRequest):
    print(login_data.user)
    if login_data.user not in users_db or users_db[login_data.user]["pwd"] != login_data.pwd:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate a JWT token
    expiration_time = datetime.utcnow() + timedelta(hours=1)  # Adjust the expiration time as needed
    payload = {
        "sub": login_data.user,
        "exp": expiration_time,
        "role": users_db[login_data.user]["role"]
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return {"access_token": token, "token_type": "bearer", "expires_in": expiration_time, "role": users_db[login_data.user]["role"]}


##########
# Protected route

@app.get("/protected")
async def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": "You have access to this protected route!", "user": current_user}


# OAuth2PasswordBearer for handling token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

#Extracting Data from PDF
def extract_text_from_pdf(reader):
    text = ""
    num_pages = len(reader.pages)
    for page_num in range(num_pages):
        page = reader.pages[page_num]
        text += page.extract_text()
    return text


@app.post("/upload_textbook")
async def upload_textbook(textbook: UploadFile = File(...),chapter_from : int = fastapi.Form(...), chapter_to: int = fastapi.Form(...), papername: str = fastapi.Form(...), token: str = fastapi.Form(...),query_type: str =fastapi.Form(...)):
    '''
    implement the "token" verification here
    '''
    '''
    query_type is of three types as of now 1) Questions, 2) Summary 3) Summary with Exapmles 
    '''
    # Your code to process the uploaded textbook content
    content_pdf = PdfReader(textbook.file)
    extracted_text = extract_text_from_pdf(content_pdf)

    #printing the text book content
    #print("TextBook Content is :" f'{extracted_text}')

    # Your OpenAI prompt for question generation
    prompt = extracted_text

    # Generate questions using OpenAI with delay
    result = await generate_questions_using_openai(prompt, chapter_from, chapter_to, papername, query_type )

    return {"Generated Content": result}  

# models_list = "gpt-3.5-turbo-16k-0613", "gpt-3.5-turbo"
async def generate_questions_using_openai(prompt,chapter_from, chapter_to, papername, query_type, delay_seconds=2):
    #print("prompt is :" f'{prompt}')
    # Your code to interact with the OpenAI API for question generation
    client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    #Old api_key="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",
    api_key="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"
)   
    def send_openai_request(gpt_query):
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-16k-0613",
            messages=[{"role": "user", "content": gpt_query}],
            temperature=0,
        )
        return response.choices[0].message.content.strip()
    # gpt_query = "String Attached" + str(chapter_from) + str(chapter_to)
   
    #query_type = query_type.lower()
    if query_type == "Questions":
        gpt_query = f"Give me a list of important questions from chapter {chapter_from} to chapter {chapter_to}: {prompt}"
        return send_openai_request(gpt_query)

    elif query_type == "Summary":
        gpt_query = f"Summarize this text: {prompt}"
        return send_openai_request(gpt_query)

    elif query_type == "Summary with Examples":
        gpt_query = f"Summarize the text with examples: {prompt}"
        return send_openai_request(gpt_query)
    
    elif query_type == "Generate Quiz":
        gpt_query = f"generate quiz: {prompt}"
        return send_openai_request(gpt_query)

    else:
        print(f"Unrecognized Query type: {query_type}")


'''
A function to generate a pdf from the JSON input from front-end request
'''

def generate_pdf(questions_data: dict):
    # Create a BytesIO buffer to store the PDF content
    pdf_buffer = BytesIO()
    print("Inside the function")
    # Create a PDF document using reportlab
    pdf = canvas.Canvas(pdf_buffer)

    # Add questions and marks to the PDF
    pdf.drawString(100, 800, "Questions:")
    y_position = 780
    total_marks = 0

    for question_data in questions_data.get("questions", []):
        question = question_data.get("question", "")
        marks = question_data.get("marks", 0)

        pdf.drawString(120, y_position, f"{question}   (Marks: {marks})")
        y_position -= 20
        total_marks += marks

    pdf.drawString(100, y_position, f"\nTotal Marks: {total_marks}")

    # Save the PDF content
    pdf.save()

    # Reset the buffer position to the beginning
    pdf_buffer.seek(0)

    return pdf_buffer.getvalue()

def generate_quiz_pdf(quiz_data: dict):
    # Create a BytesIO buffer to store the PDF content
    pdf_buffer = BytesIO()

    # Create a PDF document using reportlab
    pdf = canvas.Canvas(pdf_buffer)

    # Add quiz questions, options, and marks to the PDF
    pdf.drawString(100, 800, "Quiz:")
    y_position = 780
    total_marks = 0

    for quiz_question in quiz_data.get("quiz", []):
        question = quiz_question.get("question", "")
        options = quiz_question.get("options", [])
        correct_option = quiz_question.get("correct_option", "")
        marks = quiz_question.get("marks", 0)

        # Add question to the PDF
        pdf.drawString(120, y_position, f"- {question} (Marks: {marks})")
        y_position -= 20

        # Add options to the PDF
        for option in options:
            pdf.drawString(140, y_position, f"  - {option}")
            y_position -= 15

        # Add correct option to the PDF
        pdf.drawString(140, y_position, f"  Correct Option: {correct_option}")
        y_position -= 20

        total_marks += marks

    pdf.drawString(100, y_position, f"\nTotal Marks: {total_marks}")

    # Save the PDF content
    pdf.save()

    # Reset the buffer position to the beginning
    pdf_buffer.seek(0)

    return pdf_buffer.getvalue()


@app.post("/generate_pdf/questions")
async def generate_pdf_route(questions_data_str: str = fastapi.Form(...)):
    try:
        # Parse the JSON string into a dictionary
        questions_data = json.loads(questions_data_str)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format")

    pdf_content = generate_pdf(questions_data)
    
    return StreamingResponse(BytesIO(pdf_content), media_type="application/pdf")

# to generater pdf from quiz questions[ quiz json data is sent to this function]
@app.post("/generate_pdf/quiz")
async def generate_quiz_pdf_route(questions_data_str: str = fastapi.Form(...)):
    try:
        # Parse the JSON string into a dictionary
        quiz_data = json.loads(questions_data_str)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format")

    pdf_content = generate_quiz_pdf(quiz_data)
    
    return StreamingResponse(BytesIO(pdf_content), media_type="application/pdf")

'''
Reading data from the front end 
'''
# @app.post("/process_query_data")
# async def process_query_data(request: Request):
#     try:
#         data_str = await request.body()
#         data_dict = json.loads(data_str)
#         print(data_dict)

#         return {"data": data_dict}
    
#     except json.JSONDecodeError:
#         return {"error": "Invalid JSON format in the provided data_str"} 

if __name__ == "__main__":
    uvicorn.run('app:app', host="localhost", port=5001, reload=True)

    '''
    {"records":[{"id":"rec1X3ATCCrXl2csI","createdTime":"2020-11-10T16:59:09.000Z","fields":{"side1":"occasionally","side2":"af en toe"}},{"id":"rec2yFtwzLBDVJQy0","createdTime":"2020-11-19T12:56:53.000Z","fields":{"side1":"moderate","side2":"gematigd"}},{"id":"rec5mtD34CgSNv9vi","createdTime":"2020-11-10T16:59:29.000Z","fields":{"side1":"for the time being","side2":"voorlopig"}},{"id":"rec88KPsZi3607bEY","createdTime":"2020-11-05T06:33:25.000Z","fields":{"side1":"current","side2":"huidige"}},{"id":"recCEpvH4qqoZP4W5","createdTime":"2020-09-20T18:25:34.000Z","fields":{"side1":"To make","side2":"maaken"}},{"id":"recCOjoYursbP4eq9","createdTime":"2020-11-19T12:59:12.000Z","fields":{"side1":"fertile","side2":"vruchtbaar"}},{"id":"recCV3yCSSqDrQcHA","createdTime":"2020-11-10T16:53:34.000Z","fields":{"side1":"to turn out","side2":"blijken"}},{"id":"recHBF1euWQKXP3aG","createdTime":"2020-10-15T18:35:55.000Z","fields":{"side1":"To eat","side2":"Eten"}},{"id":"recJdro6yDNFZO9hD","createdTime":"2020-11-10T16:53:57.000Z","fields":{"side1":"to take over","side2":"overnemen"}},{"id":"recP0Un8WmxoNFeGw","createdTime":"2020-11-19T12:57:07.000Z","fields":{"side1":"border","side2":"grens"}},{"id":"recPJxpDnrfauzBh6","createdTime":"2020-11-05T06:33:38.000Z","fields":{"side1":"manager","side2":"leidinggevende"}},{"id":"recSMFR5JJHuBCgIa","createdTime":"2020-09-20T18:25:34.000Z","fields":{"side1":"To drink","side2":"Drinken"}},{"id":"recSkXoTToasJT8iz","createdTime":"2020-11-10T16:58:58.000Z","fields":{"side1":"heavy","side2":"zwaar"}},{"id":"recW41dLhtkuniQDm","createdTime":"2020-11-10T16:58:31.000Z","fields":{"side1":"face","side2":"gezicht, het"}},{"id":"recXXJep5Msy2qoqr","createdTime":"2020-11-19T12:57:07.000Z","fields":{"side1":"soft","side2":"zacht"}},{"id":"recercvDPaXjyEqJz","createdTime":"2020-11-10T16:58:11.000Z","fields":{"side1":"decision","side2":"beslissing, de"}},{"id":"reco1kGn611If0ZlC","createdTime":"2020-09-20T18:25:34.000Z","fields":{"side1":"Good morning","side2":"Goedemorgen"}},{"id":"recwAm23eWZRhiwmx","createdTime":"2020-11-10T16:57:55.000Z","fields":{"side1":"therapy","side2":"behandeling, de"}},{"id":"recy2EWveLgzAF4Bo","createdTime":"2020-11-19T12:57:18.000Z","fields":{"side1":"hilly","side2":"heuvelachtig"}}]}
    '''


    '''
    upload_text book --> generate questions using openai --> sending to frontend [selecting required questions] --> send the questions and marks to the backend [ json fomrat] --> will generate a pdf of the given questions[generate_pdf_route(),generate_pdf() ]. 
    '''