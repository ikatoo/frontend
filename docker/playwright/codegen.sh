#!/bin/bash
source ./docker/playwright/base.sh

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
