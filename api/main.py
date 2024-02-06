from fastapi import FastAPI
from authenticator import authenticator
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from routers import activities, resources, events, messages, jobs, states
from routers import veterans_accounts, partners_accounts
import os
from chat import routerC


app = FastAPI()

app.include_router(veterans_accounts.router, tags=["Authentication"])
app.include_router(partners_accounts.router, tags=["Authentication"])
app.include_router(authenticator.router, tags=["Login/Logout"])
app.include_router(activities.router, tags=["Activities"])
app.include_router(resources.router, tags=["Resources"])
app.include_router(events.router, tags=["Events"])
app.include_router(messages.router, tags=["Message Board"])
app.include_router(jobs.router, tags=["Jobs"])
app.include_router(routerC, tags=["Chat"])
app.include_router(states.router, tags=["States"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

connections = []


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            for connection in connections:
                await connection.send_text(data)
    except WebSocketDisconnect:
        connections.remove(websocket)
