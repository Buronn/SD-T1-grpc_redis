FROM python:3.8.10

WORKDIR /home/app

COPY ./server/requirements.txt .

RUN pip3 install -r requirements.txt

COPY ./server .

EXPOSE 8000

CMD ["python", "src/app.py"]