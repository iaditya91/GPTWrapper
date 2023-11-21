from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile, Depends, HTTPException
import openai

app = FastAPI()





# CORS settings to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://d7f1-128-197-29-249.ngrok-free.app","https://84.239.48.142:0","https://10.0.0.246:0"],  # Adjust this based on your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy user profile (in-memory storage for simplicity)
users_db = {
    "user1": {
        "user": "user1",
        "pwd": "password1",
        "roles": ["user"],
    },
    "user2": {
        "user": "user2",
        "pwd": "password2",
        "roles": ["student"],
    }
}

# OAuth2PasswordBearer for handling token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/")
async def read_root():
    return {"message": "Hello, this is a test endpoint!"}


# Function to authenticate and get the current user
def get_current_user(token: str = Depends(oauth2_scheme)):
    if token not in users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return users_db[token]


# Login route
@app.post("/auth")
async def login(user: str, pwd: str):
    if user not in users_db or users_db[user]["pwd"] != pwd:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # You may want to use a more secure method to generate tokens in a production environment
    token = user
    return {"access_token": token, "token_type": "bearer", "roles": users_db[user]["roles"]}

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
