from fastapi import FastAPI
from routers import events

app = FastAPI()
app.include_router(events.router)
