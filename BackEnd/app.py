from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile, Depends, HTTPException
import openai
from pydantic import BaseModel
import jwt
from datetime import datetime, timedelta
from passlib.hash import bcrypt  # Install passlib with: pip install passlib

app = FastAPI()

# Assuming you have a secret key for JWT signing
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"


# CORS settings to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://2b8e-2601-19b-b00-26d0-c4d8-40e7-12b1-7402.ngrok-free.app:3000","https://84.239.48.142:0","https://10.0.0.246:0","2601:8c:4302:45e0:8d1a:45aa:746a:6f77"],  # Adjust this based on your frontend URL
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


####code for genereting questions from uploaded text


# OAuth2PasswordBearer for handling token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Your OpenAI API key
openai.api_key = "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"


# Route to handle textbook content and generate questions
@app.post("/generate_questions")
async def generate_questions(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user),
):
    # Your code to process the uploaded textbook content
    # You may want to save the file to a storage system and extract text from it
    # For simplicity, we'll assume the file contains text
    content_text = file.file.read().decode("utf-8")
    print(content_text)
    # Your OpenAI prompt for question generation
    prompt = f"Generate questions from the following text:\n{content_text}"

    # Generate questions using OpenAI
    questions = generate_questions_using_openai(prompt)

    return {"questions": questions}


class GenerateData(BaseModel):
    chapter_from: int
    chapter_to: int
    paper_name: str
    token: str

@app.post("/generate_questions_sample")
async def generate_questions(data: GenerateData):#, textbook: UploadFile = File(...)):
    print(data)

    # Your code to process the uploaded textbook content
    # For simplicity, we'll assume the file contains text
    # #content_text = textbook  # textbook.file.read().decode("utf-8")
    # print(content_text)
    
    # # Your OpenAI prompt for question generation
    prompt = f"Generate questions from the following text from chapter {data.chapter_from} to chapter {data.chapter_to}:\n{data.chapter_to}"

    # Generate questions using OpenAI
    # questions = generate_questions_using_openai(prompt)

    return {"questions": ["what is your name", "how's it going"]}



def generate_questions_using_openai(prompt):
    # Your code to interact with the OpenAI API for question generation
    # Example:
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150
    )
    print(response)
    return response.choices[0].text.strip()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run('app:app', host="localhost", port=5001, reload=True)
