from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test():
    """
    TEST TEMPLATE
    """

    # (AAA)
    # ARRANGE

    # ACT

    # ASSERT

    # CLEAN UP
    # app.dependency

    # (AAA)
    # ARRANGE

    # ACT
# python -m pytest tests/test.py


def test_get_categories():
    # Arrange
    expected_categories = [
        {"id": 1, "name": "Hunting"},
        {"id": 2, "name": "Fishing"},
        {"id": 3, "name": "Water Sports"},
        {"id": 4, "name": "Job Fair"},
    ]

    # Act
    response = client.get("/api/categories")

    # Assert
    assert response.status_code == 200
    assert response.json() == expected_categories


# def test_list_activities():
#     # Arrange
#     expected_activities = [
#         {
            
#             "name": "Activity One",
#             "description": "This is activity one",
#             "start_date": "2022-01-01",
#             "end_date": "2022-01-02",
#             "location": "Location One",
#             "category": "Category One",
#         },
#         # Add more activities as needed
#     ]

#     # Act
#     response = client.get("/api/activities")

#     # Assert
#     assert response.status_code == 200
#     assert response.json() == expected_activities
