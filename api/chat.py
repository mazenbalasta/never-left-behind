from fastapi import (
    APIRouter,
    WebSocket,
    WebSocketDisconnect,
)
from typing import List
import json
from datetime import datetime, timezone


routerC = APIRouter()


def timestamp():
    return datetime.now(timezone.utc).isoformat()


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.current_message_id = 0

    async def connect(
        self,
        websocket: WebSocket,
        client_id: int,
    ):
        await websocket.accept()
        self.active_connections.append(websocket)
        await self.send_personal_message(
            "Welcome!",
            client_id,
            websocket,
        )

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(
        self,
        message: str,
        client_id: int,
        websocket: WebSocket,
    ):
        payload = json.dumps(
            {
                "client_id": client_id,
                "content": message,
                "timestamp": timestamp(),
                "message_id": self.next_message_id(),
            }
        )
        await websocket.send_text(payload)

    async def broadcast(self, message: str, client_id: int):
        payload = json.dumps(
            {
                "client_id": client_id,
                "content": message,
                "timestamp": timestamp(),
                "message_id": self.next_message_id(),
            }
        )
        len(self.active_connections)
        for connection in self.active_connections:
            await connection.send_text(payload)

    def next_message_id(self):
        self.current_message_id += 1
        return self.current_message_id


manager = ConnectionManager()


@routerC.websocket("/chat/{client_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    client_id: int,
):
    await manager.connect(websocket, client_id)
    try:
        while True:
            message = await websocket.receive_text()
            await manager.broadcast(message, client_id)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast("Disconnected", client_id)
