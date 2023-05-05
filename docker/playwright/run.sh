#!/bin/bash

SOURCE_PATH=$PWD
SECCOMP_FILE_PATH=${SOURCE_PATH}/docker/playwright/seccomp_profile.json

create_container ()
{
  docker run -t -i -d --name playwright \
    -p 9323:9323 \
    -v .:/tests/ \
    -w /tests \
    --user pwuser \
    mcr.microsoft.com/playwright:v1.33.0-jammy \
    bash
}

run_in_container ()
{
  docker exec -t -i playwright bash docker/playwright/entry.sh
}

if [[ $(docker ps -a --filter name=playwright -q) ]]; then
  if [[ $(docker ps --filter name=playwright -q) ]]; then
    docker exec -t -i playwright \
      bash docker/playwright/entry.sh
  else
    docker rm playwright
    create_container
    run_in_container
  fi
else
  create_container
  run_in_container
fi
