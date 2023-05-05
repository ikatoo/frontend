#!/bin/bash

SOURCE_PATH=$PWD
SECCOMP_FILE_PATH=${SOURCE_PATH}/docker/playwright/seccomp_profile.json

clear_containers ()
{
  docker rm playwright
}

create_container ()
{
docker run -t -i -d \
  --name playwright \
  -p 9323:9323 \
  -v .:/tests/ \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=$DISPLAY \
  -w /tests \
  --user pwuser \
  mcr.microsoft.com/playwright:v1.33.0-jammy \
  bash
}

run_in_container ()
{
  docker exec -t -i playwright \
    npx playwright codegen
}

if [[ $(docker ps -a --filter name=playwright -q) ]]; then
  if [[ $(docker ps --filter name=playwright -q) ]]; then
    run_in_container
  else
    clear_containers
    create_container
    run_in_container
  fi
else
  create_container
  run_in_container
fi
