express login

DEBUG=myapp:* npm start
ng serve

curl -X POST -H 'Content-Type: application/json' -d '{"email": "abcd", "password": "1234"}' localhost:3000/api/authenticate | jq .

curl localhost:3000/api/user -H 'Content-Type: application/json' -H 'Authorization: JWT 
