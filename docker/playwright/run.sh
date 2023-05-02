#!/bin/bash

SOURCE_PATH=$PWD
SECCOMP_FILE_PATH=${SOURCE_PATH}/docker/playwright/seccomp_profile.json

if [[ $(docker ps -a --filter name=playwright -q) ]]; then
  echo "Container exists"
  docker exec -t -i playwright \
    bash docker/playwright/entry.sh
else
  echo "Creating a new container"
  docker run -d \
    --name=playwright \
    -v .:/tests/ \
    -w /tests \
    --user pwuser \
    --security-opt seccomp=${SECCOMP_FILE_PATH} \
    --ipc=host \
    mcr.microsoft.com/playwright:v1.33.0-jammy && \
  docker exec -t -i playwright \
    bash docker/playwright/entry.sh
fi
