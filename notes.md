express login

DEBUG=myapp:* npm start
ng serve

curl -X POST -H 'Content-Type: application/json' -d '{"email": "abcd", "password": "1234"}' localhost:3000/api/authenticate | jq .

curl localhost:3000/api/user -H 'Content-Type: application/json' -H 'Authorization: JWT 

docker-compose -f docker-compose.yml -f docker-compose.dev.yml run --rm client /bin/bash
## more examples
docker-compose run --rm client ng init --skip-npm --name CliDemo
docker-compose run --rm client npm install

docker exec -ti 5c596e4ed826 /bin/bash # open bash in running container

# MongoDB
mongo$
show dbs$
use login$
show collections # who all collections, should list 'users'$
db.users.find() # list all users$
exit

# Links
Script for integration testing.
https://hharnisc.github.io/2016/06/19/integration-testing-with-docker-compose.html

Password salt and hash
http://blog.robertonodi.me/node-authentication-series-email-and-password/
http://blog.slatepeak.com/refactoring-a-basic-authenticated-api-with-node-express-and-mongo/

http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html
