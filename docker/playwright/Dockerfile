FROM node:18.13-bullseye-slim

RUN useradd -m pwuser

USER pwuser

WORKDIR /home/pwuser/tests

RUN mkdir tests && \
  npm i @playwright/test && \
  npx playwright install --with-deps --force

COPY playwright.config.ts .

CMD npx playwright test

