#!/bin/bash

npx playwright install
# npx playwright test --headed --reporter=dot --forbid-only --max-failures=1
npx playwright test
