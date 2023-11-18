import openai
from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str = 'OPENAI_API_KEY'

    class Config:
        env_file = '.env'

# settings = Settings()
# openai.api_key = settings.OPENAI_API_KEY

openai.api_key = "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"

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# @app.post("/upload")
# async def upload_file(file: UploadFile = File(...)):
#     # Do something with the uploaded file
#     # You can save it to a specific directory, process it, etc.
#     return {"filename": file.filename}

# @app.post("/generate_question_paper")
# def generate_question_paper(file: UploadFile = File(...)):
#     # Read the contents of the uploaded file
#     file_content = file.file.read().decode("utf-8")

#     # Generate questions using OpenAI's API
#     prompt = f"Generate questions based on the following text: {file_content}"
#     response = openai.Completion.create(
#         model="text-davinci-002",
#         prompt=prompt,
#         temperature=0.6,
#         max_tokens=150,
#     )

#     # Extract the generated questions from the OpenAI response
#     generated_questions = response.choices[0].text.strip()

#     return {"generated_questions": generated_questions}

from fastapi import HTTPException

@app.post("/generate_question_paper")
def generate_question_paper(file: UploadFile = File(...)):
    try:
        # Read the contents of the uploaded file
        file_content = file.file.read().decode("utf-8")
    except UnicodeDecodeError:
        # Handle decoding error by trying a different encoding
        try:
            file_content = file.file.read().decode("latin-1")  # Adjust to the actual encoding if known
        except UnicodeDecodeError:
            raise HTTPException(status_code=400, detail="Unable to decode file content.")
    # print("Mahesh")
    # Generate questions using OpenAI's API
    prompt = f"Generate questions based on the following text: {file_content}"
    response = openai.Completion.create(
        model="code-davinci-edit-001",
        prompt=prompt,
        temperature=0.6,
        max_tokens=150,
    )
    # print(response)

    # Extract the generated questions from the OpenAI response
    generated_questions = response.choices[0].text.strip()

    return {"generated_questions": generated_questions}


if __name__ == "__main__":
    uvicorn.run('app:app', host="localhost", port=5001, reload=True)
