FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app
COPY requirements.txt requirements.txt
COPY main.py main.py
COPY queries queries
COPY routers routers
COPY authenticator.py authenticator.py
COPY models.py models.py
COPY chat.py chat.py
RUN python -m pip install -r requirements.txt
COPY migrations migrations
CMD python -m migrations up && uvicorn main:app --host 0.0.0.0 --port 80 --forwarded-allow-ips "*"
