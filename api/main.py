from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
from routers import activities, resources, events, messages, jobs, roles
from routers import accounts
import os


app = FastAPI()

app.add_api_route("/api/roles", roles.create_role, methods=["POST"])
app.add_api_route("/api/roles", roles.assign_role, methods=["PUT"])
app.include_router(accounts.router, tags=["Authentication"])
app.include_router(authenticator.router, tags=["Authentication"])
app.include_router(accounts.router, tags=["Authentication"])
app.include_router(activities.router, tags=["Activities"])
app.include_router(resources.router, tags=["Resources"])
app.include_router(events.router, tags=["Events"])
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


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
