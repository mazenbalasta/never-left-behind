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


class TestCreateJobSuccess(unittest.TestCase):
    def test_create_job_success(self):
        # Arrange
        mock_job_input = JobsIn(
            position="Software Engineer",
            company_name="NLB Corp",
            role="Full Stack Developer",
            requirements="Bachelor's degree in Computer Science",
            qualifications="2+ years of experience in web development",
            pref_qualifications="Experience in Vite React, Postgresql, Docker and FastApi",
            location="Cityville",
            apply_url="https://neverleftbehind.com/apply",
        )

        with patch("queries.jobs.JobsRepo.create") as mock_create:
            mock_create.return_value = JobsOut(id=1, **mock_job_input.dict())

            # Act
            response = client.post("/api/jobs", json=mock_job_input.dict())

            # Assert
            self.assertEqual(response.status_code, 200)
            result = response.json()
            self.assertIn("id", result)
            self.assertEqual(result["position"], mock_job_input.position)
            self.assertEqual(
                result["pref_qualifications"],
                mock_job_input.pref_qualifications,
            )

    # Clean-up is unnecessary because functoin is using patch() method from unittest.mock


def test_events_list():
    """
    Test the list_events endpoint
    """
    KEY = "FRHH87OASHDFNKJH53558NAUFJNLKZVSUOHNEFK354HNDJSHFSDKL534NFFJSDNKLNFVHNDFC472398HR345EHFIHNA4534SOFHNHN5434VHNN"
    # (AAA)
    # ARRANGE
    repo = EventsRepo()
    event = EventsIn(
        event_title=KEY,
        start_date="2040-02-01T17:53:28.126Z",
        end_date="2040-02-01T17:53:28.126Z",
        street_address="123 Test St",
        city="Test City",
        state="AK",
    )
    repo.create(event)
    # ACT
    response = client.get("/api/events")
    # ASSERT
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[len(response.json()) - 1]["event_title"] == KEY
    print(response.json()[0]["event_title"])
    # CLEAN UP
    # app.dependency


# python -m pytest tests/test.py

import unittest
from unittest.mock import MagicMock, patch
from queries.messages import MessagesRepo, MessagesOut
from datetime import datetime


class TestMessagesRepo(unittest.TestCase):
    def setUp(self):
        self.repo = MessagesRepo()

    @patch("queries.pool.pool.connection")
    def test_list_messages(self, mock_connection):
        # Arrange
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

        # Act
        result = self.repo.list_messages()

        # Assert
        self.assertEqual(result, expected_result)

    @patch("queries.pool.pool.connection")
    def test_delete_message_succesful(self, mock_connection):
        # Arrange
        message_id = 1
        mock_cursor = MagicMock()
        mock_cursor.rowcount = 1
        mock_connection.return_value.__enter__.return_value.cursor.return_value.__enter__.return_value = (
            mock_cursor
        )

        # Act
        result = self.repo.delete_message(message_id)

        # Assert
        self.assertTrue(result)


if __name__ == "__main__":
    unittest.main()
