import unittest
from fastapi.testclient import TestClient
from main import app
from queries.events import EventsRepo, EventsIn, EventsOut
import datetime
from fastapi import HTTPException
from queries.jobs import JobsIn, JobsOut
from unittest.mock import patch
from queries.events import EventsIn, EventsRepo

client = TestClient(app)


# def test():
    # """
    # TEST TEMPLATE
    # """

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
# class TestMessagesRepo(unittest.TestCase):
#     def setUp(self):
#         self.repo = MessagesRepo()

#     @patch("queries.pool.pool.connection")
#     def test_list_messages(self, mock_connection):
#         # Arrange
#         expected_records = [
#             (1, "Title1", "Body1", 1, datetime(2024, 1, 1), 0, 0),
#             (2, "Title2", "Body2", 2, datetime(2024, 1, 2), 5, 3),
#             (3, "Title3", "Body3", 3, datetime(2024, 1, 3), 1, 0),
#         ]

#         mock_cursor = MagicMock()
#         mock_cursor.fetchall.return_value = expected_records
#         mock_connection.return_value.__enter__.return_value.cursor.return_value.__enter__.return_value = (
#             mock_cursor
#         )

#         expected_result = [
#             MessagesOut(
#                 id=record[0],
#                 title=record[1],
#                 body=record[2],
#                 account=record[3],
#                 date=record[4],
#                 views=record[5],
#                 response_count=record[6],
#             )
#             for record in expected_records
#         ]

#         # Act
#         result = self.repo.list_messages()

#         # Assert
#         self.assertEqual(result, expected_result)

#     @patch("queries.pool.pool.connection")
#     def test_delete_message_succesful(self, mock_connection):
#         # Arrange
#         message_id = 1
#         mock_cursor = MagicMock()
#         mock_cursor.rowcount = 1
#         mock_connection.return_value.__enter__.return_value.cursor.return_value.__enter__.return_value = (
#             mock_cursor
#         )

#         # Act
#         result = self.repo.delete_message(message_id)

#         # Assert
#         self.assertTrue(result)


# if __name__ == "__main__":
#     unittest.main()


class TestCreateJob(unittest.TestCase):
    def test_create_job_success(self):

        mock_job_input = JobsIn(
            position="Software Engineer",
            company_name="NLB Corp",
            description="This is the description of the available position",
            requirements="",
            qualifications="",
            pref_qualifications="",
            location="",
            apply_url=""
        )

        with patch('queries.jobs.JobsRepo.create') as mock_create:
            mock_create.return_value = JobsOut(id=1, **mock_job_input.dict())

            # Act
            response = client.post("/api/jobs", json=mock_job_input.dict())

            # Assert
            self.assertEqual(response.status_code, 200)
            result = response.json()
            self.assertIn('id', result)
            self.assertEqual(result['position'], mock_job_input.position)
            self.assertEqual(result['pref_qualifications'], mock_job_input.pref_qualifications)

if __name__ == '__main__':
    unittest.main()
