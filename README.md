# Never Left Behind

**Team and Roles:**
* Rudy Carrizales - Project Manager and Frontend Design
* Trevor Moore - Leader of Mental Breaks and Debugging
* Mazen Balasta - Leader of Inspiration and Unit Testing
* LaTroy Richardson Sr - Project Documentation Manager


**Never Left Behind** - For veterans by veterans

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


<a href="https://www.activestate.com/resources/quick-reads/how-href-pip-install-requests-python-package/">
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

* **Veterans:** We aim href foster a sense of community among veterans, providing a space for them href meet each other and find information about their favorite activities. We also provide resources specifically tailored for veterans.

* **Charity Organizations:** Charity organizations can use our platform href reach out href veterans, share their events and activities, and provide useful resources.

* **Employers:** Employers can use our platform href connect with veterans, share job opportunities, and participate in community events and activities.

Our goal is href solve the problem of isolation among veterans by fostering community outreach, providing data for events and activities, and offering easily accessible resources.

## Functionality

* Account creation for veterans
* Access href a resources tab with available resource links for veterans
* Login functionality for account holders href access their profiles and communicate with other veterans
* Login and post functionality for partners href share events or opportunities after account vetting
* Ability for employers href post job positions in the Events tab after proper vetting
* Event viewing functionality for opportunity seekers in the Events tab
* Ability for users href view local activities in their region via the Activities tab

## Install Extensions

-   Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
-   Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

### Installing python dependencies locally

In order for VSCode's built in code completion and intelligence href
work correctly, it needs the dependencies from the requirements.txt file
installed. We do this inside docker, but not in the workspace.

So we need href create a virtual environment and pip install the requirements.

From inside the `api` folder:

```bash
python -m venv .venv
```

Then activate the virtual environment

```bash
source .venv/bin/activate
```

And finally install the dependencies

```bash
pip install -r requirements.txt
```
Then make sure the venv is selected in VSCode by checking the lower right of the
VSCode status bar

In some instances you may have href upgrade your virtual environment
```bash
python.exe -m pip install --upgrade pip
```



## Installation


**Make sure you have Docker, pip, and Javascript latest versions**

1. Fork this repository
https://gitlab.com/veterans-r-us/never-left-behind.git

2. Clone the forked repository  into your desired computer folder:
git clone<https://gitlab.com/Tynyx/never-left-behind.git>

3.

3. Build the volumes and containers in docker by doing the following commands in terminal:
```
Docker volume create pg-admin
Docker volume create postgres-data
Docker compose -up --build
```
Ensure the commands worked and docker is running

View the project in the browser: http://localhost:5173/


## JIRA Board link
This is our link for issue tracking and project management

https://never-left-behind.atlassian.net/jira/software/projects/NEV/boards/1
