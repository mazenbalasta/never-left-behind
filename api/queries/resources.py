from pydantic import BaseModel
from typing import Optional

class ResourcesIn(BaseModel):
    name: str
    description: Optional[str] = None


class ResourcesOut(BaseModel):
    name: str
    description: Optional[str] = None
    url: str
    id: int
