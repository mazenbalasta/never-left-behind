from fastapi import FastAPI
from routers import resources

app = FastAPI()
app.include_router(resources.router)
