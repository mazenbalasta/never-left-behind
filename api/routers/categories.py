from fastapi import APIRouter, Depends
from queries.categories import CategoryRepo, CategoryOut
from typing import List

router = APIRouter()


@router.get("/api/categories", response_model=List[CategoryOut])
def list_categories(repo: CategoryRepo = Depends()):
    return repo.list_categories()
