import unittest
from unittest.mock import MagicMock

from api.queries.messages import MessagesIn, MessagesOut

class TestMessages(unittest.TestCase):
    def setUp(self):
        # Set up any necessary dependencies or test data
        self.pool = MagicMock()
        self.message = MessagesIn(
            title="Test Title",
            body="Test Body",
            account="Test Account",
            date="2022-01-01",
        )
        self.messages = Messages()

    def test_create_success(self):
        # Mock the database connection and cursor
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        self.pool.connection.return_value = mock_conn
        mock_conn.cursor.return_value = mock_cursor

        # Mock the execute and fetchone methods
        mock_cursor.fetchone.return_value = (
            1, "Test Title", "Test Body", "Test Account", "2022-01-01", 0
        )

        # Call the create method
        result = self.messages.create(self.message)

        # Assert the result
        self.assertIsInstance(result, MessagesOut)
        self.assertEqual(result.id, 1)
        self.assertEqual(result.title, "Test Title")
        self.assertEqual(result.body, "Test Body")
        self.assertEqual(result.account, "Test Account")
        self.assertEqual(result.date, "2022-01-01")
        self.assertEqual(result.views, 0)

    def test_create_failure(self):
        # Mock the database connection and cursor
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        self.pool.connection.return_value = mock_conn
        mock_conn.cursor.return_value = mock_cursor

        # Mock the execute method to raise an exception
        mock_cursor.execute.side_effect = Exception("Test Exception")

        # Call the create method and assert that it raises an HTTPException
        with self.assertRaises(HTTPException):
            self.messages.create(self.message)

if __name__ == "__main__":
    unittest.main()
