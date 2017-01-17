#! /bin/bash

curl localhost:3000/api/user -H 'Content-Type: application/json' -H 'Authorization: JWT $1'
