from fastapi.testclient import TestClient
from main import app
from queries.events import EventsRepo, EventsIn, EventsOut
import datetime
from fastapi import HTTPException


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

    pass


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
        start_date="5020-02-01T17:53:28.126Z",
        end_date="5020-02-01T17:53:28.126Z",
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
    print(response.json()[len(response.json()) - 1]["event_title"])

    # CLEAN UP
    repo.delete_event(event_id=response.json()[len(response.json()) - 1]["id"])


# python -m pytest tests/test.py
