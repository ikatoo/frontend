#!/bin/bash

SOURCE_PATH=$PWD
SECCOMP_FILE_PATH=${SOURCE_PATH}/docker/playwright/seccomp_profile.json

clear_containers ()
{
  docker rm playwright
}

create_container ()
{
docker run -t -i -d --name playwright \
  -p 9323:9323 \
  -v .:/tests/ \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=$DISPLAY \
  -w /tests \
  --user pwuser \
  mcr.microsoft.com/playwright:v1.33.0-jammy \
  bash
}


