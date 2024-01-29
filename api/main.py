from fastapi import FastAPI
from authenticator import authenticator

from fastapi.middleware.cors import CORSMiddleware
from routers import activities, resources, events, messages, jobs
from routers import vaterans_accounts, partners_accounts
import os


app = FastAPI()

app.include_router(vaterans_accounts.router, tags=["Authentication"])
app.include_router(partners_accounts.router, tags=["Authentication"])
app.include_router(authenticator.router, tags=["Login/Logout"])
app.include_router(activities.router, tags=["Activities"])
app.include_router(resources.router, tags=["Resources"])
app.include_router(events.router, tags=["Events"])
app.include_router(messages.router, tags=["Message Board"])
app.include_router(jobs.router, tags=["Jobs"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
