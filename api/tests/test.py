
import unittest
from unittest.mock import MagicMock, patch
from queries.messages import MessagesRepo, MessagesOut
from datetime import datetime


class TestMessagesRepo(unittest.TestCase):

    def setUp(self):
        self.repo = MessagesRepo()

    @patch('queries.pool.pool.connection')
    def test_list_messages(self, mock_connection):
        # Arrange
        expected_records = [
            (1, 'Title1', 'Body1', 1, datetime(2024, 1, 1), 0, 0),
            (2, 'Title2', 'Body2', 2, datetime(2024, 1, 2), 5, 3),
            (3, 'Title3', 'Body3', 3, datetime(2024, 1, 3), 1, 0)
        ]

        mock_cursor = MagicMock()
        mock_cursor.fetchall.return_value = expected_records
        mock_connection.return_value.__enter__.return_value.cursor.return_value.__enter__.return_value = mock_cursor

        expected_result = [MessagesOut(
            id=record[0],
            title=record[1],
            body=record[2],
            account=record[3],
            date=record[4],
            views=record[5],
            response_count=record[6]
        ) for record in expected_records]

        # Act
        result = self.repo.list_messages()

        # Assert
        self.assertEqual(result, expected_result)


    @patch('queries.pool.pool.connection')
    def test_delete_message_succesful(self, mock_connection):
            
        # Arrange
        message_id = 1
        mock_cursor = MagicMock()
        mock_cursor.rowcount = 1
        mock_connection.return_value.__enter__.return_value.cursor.return_value.__enter__.return_value = mock_cursor

        # Act
        result = self.repo.delete_message(message_id)

        # Assert
        self.assertTrue(result)



if __name__ == '__main__':
    unittest.main()
