#!/usr/bin/bash

pushd webappslpage
  npm install
  npm run build
popd

mv webappslpage/build/ backend/static

cd backend

python3 -m venv .
source bin/activate
pip install -r requirements.txt
