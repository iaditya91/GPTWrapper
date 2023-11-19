from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS settings to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this based on your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy user profile (in-memory storage for simplicity)
users_db = {
    "user1": {
        "username": "user1",
        "password": "password1",
        "roles": ["user"],
    },
}

# OAuth2PasswordBearer for handling token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Function to authenticate and get the current user
def get_current_user(token: str = Depends(oauth2_scheme)):
    if token not in users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return users_db[token]


# Login route
@app.post("/auth")
async def login(username: str, password: str):
    if username not in users_db or users_db[username]["password"] != password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # You may want to use a more secure method to generate tokens in a production environment
    token = username
    return {"access_token": token, "token_type": "bearer", "roles": users_db[username]["roles"]}

# Protected route
@app.get("/protected")
async def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": "You have access to this protected route!", "user": current_user}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run('app:app', host="localhost", port=5001, reload=True)
