FROM node:16-bullseye-slim AS frontbuilder

WORKDIR /app
ENV CHOKIDAR_USEPOLLING=true

COPY webappslpage/package.json ./
COPY webappslpage/package-lock.json ./
RUN npm install --silent

COPY webappslpage/tsconfig.json ./
COPY webappslpage/src ./src
COPY webappslpage/public ./public

RUN npm run build

FROM python:3.9-slim-bullseye

WORKDIR /app

COPY --from=frontbuilder /app/build /app/static

COPY backend/requirements.txt /app/
RUN pip install -r requirements.txt

COPY backend/chatbot_back ./chatbot_back
COPY backend/run.py ./

CMD [ "python3", "-m", "gunicorn", "run:app" ]
