from fastapi import FastAPI
from routers import activities

from fastapi.middleware.cors import CORSMiddleware
from routers import activities, resources, events
import os

app = FastAPI()
app.include_router(activities.router)







app.include_router(activities.router, tags=["Activities"])
app.include_router(resources.router, tags=["Resources"])
app.include_router(events.router, tags=["Events"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST")
    ],
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
            "min": "00"
        }
    }
