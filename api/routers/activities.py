from fastapi import FastAPI
from routers import activities

app = FastAPI()
app.include_router(activities.router)
