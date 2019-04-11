#!/usr/bin/env bash

npm install --global serve

serve -l 5000 docs/dist &> serve.log &
