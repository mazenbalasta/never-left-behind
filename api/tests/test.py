from fastapi.testclient import TestClient
from main import app
from queries.jobs import JobsIn, JobsOut
from unittest.mock import patch, MagicMock
from queries.messages import MessagesOut, MessagesRepo
from datetime import datetime
import unittest


client = TestClient(app)


def test_get_categories():

    expected_categories = [
        {"id": 1, "name": "Hunting"},
        {"id": 2, "name": "Fishing"},
        {"id": 3, "name": "Water Sports"},
        {"id": 4, "name": "Job Fair"},
    ]

    response = client.get("/api/categories")

    assert response.status_code == 200
    assert response.json() == expected_categories


def test_list_events():

    expected_events = [
        {
            "id": 1,
            "event_title": "Event One",
            "start_date": "2022-01-01",
            "end_date": "2022-01-02",
            "description": "This is event one",
            "street_address": "123 Main St",
            "city": "Anytown",
            "state": "CA",
        },
        {
            "id": 2,
            "event_title": "Event Two",
            "start_date": "2022-01-01",
            "end_date": "2022-01-02",
            "description": "This is event two",
            "street_address": "123 Main St",
            "city": "Anytown",
            "state": "CA",
        },
        {
            "id": 3,
            "event_title": "Event Three",
            "start_date": "2022-01-01",
            "end_date": "2022-01-02",
            "description": "This is event three",
            "street_address": "123 Main St",
            "city": "Anytown",
            "state": "CA",
        },
    ]

    client = MagicMock()
    client.get.return_value.status_code = 200
    client.get.return_value.json.return_value = expected_events

    response = client.get("/api/events")

    assert response.status_code == 200
    assert response.json() == expected_events


class TestCreateJob(unittest.TestCase):
    def test_create_job_success(self):
        mock_job_input = JobsIn(
            position="Software Engineer",
            company_name="NLB Corp",
            description="This is the description of the available position",
            requirements="Bachelor's degree in Computer Science",
            qualifications="Experience in Vite, React, Postgresql, Docker and FastApi",
            pref_qualifications="2+ years of experience in web development",
            location="Cityville",
            apply_url="https://neverleftbehind.com/apply",
            created_by=3
        )

        with patch("queries.jobs.JobsRepo.create") as mock_create:
            mock_create.return_value = JobsOut(id=1, **mock_job_input.dict())

            response = client.post("/api/jobs", json=mock_job_input.dict())

            self.assertEqual(response.status_code, 200)
            result = response.json()
            self.assertIn("id", result)
            self.assertEqual(result["position"], mock_job_input.position)
            self.assertEqual(
                result["pref_qualifications"],
                mock_job_input.pref_qualifications,
            )


if __name__ == "__main__":
    unittest.main()


class TestMessagesRepo(unittest.TestCase):
    def setUp(self):
        self.repo = MessagesRepo()

    @patch("queries.pool.pool.connection")
    def test_list_messages(self, mock_connection):
        expected_records = [
            (1, "Title1", "Body1", 1, datetime(2024, 1, 1), 0, 0),
            (2, "Title2", "Body2", 2, datetime(2024, 1, 2), 5, 3),
            (3, "Title3", "Body3", 3, datetime(2024, 1, 3), 1, 0),
        ]

        mock_cursor = MagicMock()
        mock_cursor.fetchall.return_value = expected_records
        mock_connection.return_value.__enter__.return_value.cursor.return_value.__enter__.return_value = (
            mock_cursor
        )

        expected_result = [
            MessagesOut(
                id=record[0],
                title=record[1],
                body=record[2],
                account=record[3],
                date=record[4],
                views=record[5],
                response_count=record[6],
            )
            for record in expected_records
        ]

        result = self.repo.list_messages()

        self.assertEqual(result, expected_result)

    @patch("queries.pool.pool.connection")
    def test_delete_message_succesful(self, mock_connection):

        message_id = 1
        mock_cursor = MagicMock()
        mock_cursor.rowcount = 1
        mock_connection.return_value.__enter__.return_value.cursor.return_value.__enter__.return_value = (
            mock_cursor
        )

        result = self.repo.delete_message(message_id)

        self.assertTrue(result)


if __name__ == "__main__":
    unittest.main()
