# Never Left Behind

**Team and Roles:**
* Rudy Carrizales - Project Manager and Frontend Design
* Trevor Moore - Leader of Mental Breaks and Debugging
* Mazen Balasta - Leader of Inspiration and Unit Testing
* LaTroy Richardson Sr - Project Documentation Manager




## Design

- [API Design](docs/API.md)
- [GHI](docs/GHI.md)
- [Integrations](docs/Integrations.md)



## Built With
<a href="https://black.readthedocs.io/en/latest/index.html">
  <img src="https://apibakery-public-assets.s3.amazonaws.com/blog/Black-Logo.png" alt="Black" width="200"/>
</a>



<a href="https://jwtdown-fastapi.readthedocs.io/en/stable/intro.html">
  <img src="https://mms.businesswire.com/media/20230530005012/en/1802833/2/galvanize_logo_a-stride-company_full-color_light-background_%281%29.jpg" alt="Jwtdown-FastAPI" width="250"/>
</a>


<a href="https://www.activestate.com/resources/quick-reads/how-to-pip-install-requests-python-package/">
  <img src="https://cdn.activestate.com/wp-content/uploads/2021/08/pip-install-requests-1000x500.png" alt="Requests" width="200"/>
</a>

<a href="https://fastapi.tiangolo.com/">
  <img src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" alt="FastAPI" width="200"/>
</a>

<a href="https://www.uvicorn.org/">
  <img src="https://www.uvicorn.org/uvicorn.png" alt="Uvicorn" width="200"/>
</a>

<a href="https://docs.pytest.org/en/7.1.x/getting-started.html">
  <img src="https://docs.pytest.org/en/7.1.x/_static/pytest_logo_curves.svg" alt="Pytest" width="200"/>
</a>

<a href="https://www.psycopg.org/psycopg3/docs/basic/install.html">
  <img src="https://www.psycopg.org/psycopg3/docs/_static/psycopg.svg" alt="Psycopg" width="200"/>
</a>

<a href="https://websockets.readthedocs.io/en/stable/intro/index.html">
  <img src="https://websockets.readthedocs.io/en/stable/_static/websockets.svg" alt="Websockets" width="200"/>
</a>





## Intended Market

Our platform is designed for:

* **Veterans:** We aim to foster a sense of community among veterans, providing a space for them to meet each other and find information about their favorite activities. We also provide resources specifically tailored for veterans.

* **Charity Organizations:** Charity organizations can use our platform to reach out to veterans, share their events and activities, and provide useful resources.

* **Employers:** Employers can use our platform to connect with veterans, share job opportunities, and participate in community events and activities.

Our goal is to solve the problem of isolation among veterans by fostering community outreach, providing data for events and activities, and offering easily accessible resources.

## Functionality

* Account creation for veterans
* Access to a resources tab with available resource links for veterans
* Login functionality for account holders to access their profiles and communicate with other veterans
* Login and post functionality for partners to share events or opportunities after account vetting
* Ability for employers to post job positions in the Events tab after proper vetting
* Event viewing functionality for opportunity seekers in the Events tab
* Ability for users to view local activities in their region via the Activities tab

## Installation

In order to run this application you need to install the following:


**Make sure you have Docker, Git, and Javascript latest versions**

1. Fork this repository
https://gitlab.com/veterans-r-us/never-left-behind.git

2. Clone the forked repository  into y ou desired computer folder:
git clone<http://gitlab.com/**yourrepo**>

3. Build the volumes and containers in docker by doing the following:
```
Docker volume create pg-admin
Docker volume create postgres-data
Docker compose -up --build
```
Ensure the commands worked and docker is running

View the project in the browser: http://localhost:5173/
