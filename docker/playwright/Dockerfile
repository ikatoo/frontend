FROM mcr.microsoft.com/playwright:v1.33.0-jammy

USER pwuser

WORKDIR /home/pwuser/tests

RUN npm init playwright@latest

COPY --chown=pwuser:pwuser e2e playwright.config.ts /home/pwuser/tests/

RUN npx playwright test
