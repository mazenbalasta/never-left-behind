import json
import requests
from requests.exceptions import RequestException


def get_local_bars(postal):
    try:
        response = requests.get(
            f"https://api.openbrewerydb.org/v1/breweries?by_postal={postal}&per_page=3"
        )
        content = json.loads(response.content)
        local_bars = {
            "name": content["name"],
            "brewery_type": content["brewery_type"],
            "address_1": content["address_1"],
            "city": content["city"],
            "state": content["state"],
            "website_url": content["website_url"],
        }

        return local_bars

    except RequestException as e:
        return None, None
    except KeyError as e:
        return None, None
    except json.JSONDecodeError as e:
        return None, None
    except Exception as e:
        return None, None
