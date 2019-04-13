#!/usr/bin/env bash

npm install --global serve

serve -l 5000 /myntra/${APP}/docs/dist &> /myntra/${APP}/docs/dist/serve.log &
