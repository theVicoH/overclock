FROM python:3.9-slim AS builder

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

FROM python:3.9-slim

WORKDIR /app

COPY --from=builder /app /app

RUN flake8 . && python -m unittest discover -s .

CMD ["python", "detect.py"]
