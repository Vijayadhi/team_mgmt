# ---------- FRONTEND BUILD ----------
FROM node:20-slim AS frontend-build

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build


# ---------- BACKEND ----------
FROM python:3.11-slim

WORKDIR /code

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# install python deps
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt && \
    pip install gunicorn uvicorn

# copy backend
COPY app ./app

# copy built frontend into FastAPI static
COPY --from=frontend-build /frontend/dist /code/app/static

EXPOSE 7860

CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "app.main:main", "--bind", "0.0.0.0:7860"]