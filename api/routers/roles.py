from fastapi import FastAPI
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from queries.roles import Role

Base = declarative_base()

DATABASE_URL = "postgresql://user:password@postgres/nlb-db"

engine = create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
app = FastAPI()


@app.post("/roles/{role_name}")
def create_role(role_name: str):
    db = SessionLocal()
    db.add(Role(name=role_name))
    db.commit()

@app.put("/roles/{role_name}/{account_id}")
def assign_role(role_name: str, account_id: int):
    db = SessionLocal()
    role = db.query(Role).filter(Role.name == role_name).first()
    role.account_id = account_id
    db.commit()