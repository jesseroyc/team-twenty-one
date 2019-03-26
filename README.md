 _____                   _____                   _         _____           
|_   _| ___  ___  _____ |_   _| _ _ _  ___  ___ | |_  _ _ |     | ___  ___ 
  | |  | -_|| .'||     |  | |  | | | || -_||   ||  _|| | ||  |  ||   || -_|
  |_|  |___||__,||_|_|_|  |_|  |_____||___||_|_||_|  |_  ||_____||_|_||___|
                                                     |___|                 
 -----------------------------------------------------------------------------

Node.js app featuring React, MongoDb, Express, Webpack, Babel, PM2, Docker and 
Docker-Compose. It was developed in a Cloud IDE hosted in the same AWS EC2 Ubuntu 
16.04 server it was deployed on. This is an ssr project that features an isomorphic 
design as well. The app handles get and post requests from an Arduino MK2 that is
reporting sensor readings for a automated plant incubator system.

If using a Cloud9 environment the commands below were necessary for docker to behave
properly. In a local environment it should be as simple as cd in running your typical
`npm install`, `npm run build` and `npm run start`.

```
sudo yum update -y                 # Update environment
sudo yum install docker            # Install docker
sudo service docker start          # Start docker service
sudo usermod -a -G docker ec2-user # Add some user to group
```
\
Cloud9 is mounted on an AWS EC2 server that may not have the appropriate symbolic links
use the following if this is the case:
```
sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```
\
This project is setup with automated tools that can be configured. This is done through
edits of the top level class Config (tools/Config.js). The parent classes feature a
looping composition relationship that aggregates child Config classes. Which resembles
the following:
tools/Service.js  <b><|>--- parent has one parent ---</b> tools/Config.js
tools/Config.js   <b>< >--- parent has many child ---</b> module/Service.js
module/Service.js <b><|>--- child has one child   ---</b> module/Config
\
Example usage of the automated tools below.
*Notice the usage of babel-node, install babel cli and it's dependencies globally for
the `babel-node` usage. Otherwise use the bin folder as such `./node_modules/.bin/babel`.
```
  Example:

     babel-node tools/Service build

  Usage:

     babel-node tools/Service <command>

  Commands:

     build    |  watches src and bundles file to build directory of root
     dist     |  watches src and bundles file to dist directory of root
     start    |  watches build and runs server file in build directory of root
     deploy   |  clears and uses docker-compose to deploy
     test     |  watches test files and run test files in src directory of root
     clean    |  clears docker containers, images and volumes
```
Before tinkering around with mongo the scripts may need some extended permissions, 
chmod your group with added permissions using `+x`. Remove permissions with `-x`.

```
chmod +x run.sh
chmod +x set_mongodb_password.sh
```
\
Similarly the ubuntu container might need extended permissions for its socket as well.

```
sudo chmod 666 /var/run/docker.sock
```
\
The MongoDB implementation is deployed in a docker container that exposes port 27017.
This port needs to be bound to the local/deployment port with the notation 27017:27017.
Without using docker-compose the Dockerfile can be built, tagged, port-bounded and run 
by cd into the /mongo directory and using the following: 
```
docker build --tag=mongo .
docker run -p 27017:27017 mongo
```
This has been implemented in the tools and is not necessary.
\
The docker-compose file handles all of the Dockerfiles during deployment. There is two 
containers and only one of them will have node/carbon, the transpiled/minified app and 
a process manager known as PM2. PM2 can be built, tagged, port-bounded and run by cd 
into the /node directory and using the following:
```
docker build --tag=node .
docker run -p 80:80 node
```
This has been implemented in the tools and is not necessary.
\
The docker-compose file handles all of the Dockerfiles during deployment. It sets up the
containers mentioned above. It can be done using the follwoing commands in the directory
that is equiped with the docker-compose.yml file.
```
docker-compose build -docker
docker-compose up
```
This has been implemented in the tools and is not necessary.
\
When the deployment is taken down the containers, images and volumes will cause disk memory
related erros. The containers need to be stopped, removed and deleted using the following:
PS - I had to prepend with --force to completly remove and prune volumes in development.
```
docker container stop $(docker container ls -aq)
docker container rm $(docker container ls -aq)
docker rmi $(docker images -aq)
docker system prune --volumes
```
This has been implemented in the tools and is not necessary.
\
View current docker containers, volumes, images, and networks.

```
docker ps -a
```
\
Start bash in a container.
```
docker exec -it [container-id] bash
```
\
This project receives requests from an Arduino MK2 anywhere with wifi connectivity. The MK2
sends http get and post requests to an express router defined route with the following format:
\
Route Params Format: 
  /record/:tmp/:moi/:lum
\
Route Example: 
  record/20.1/34.2/12.4
\
The application wiil add the values to the database and create an array data samples when
a user visits the /record. This array is then used for a rendered material design graph.
\
The collection objects inserted have the following format.

```
  {
    _id: 6
    tim: 1553126557
    tmp: 20.1
    moi: 34.2
    lum: 12.4
  }
```
\
Next Releases:
- Material UI frontend with graphs.
- Fluent Logging Container
- Optimized bundles
- Service worker implementation
- Babel & Webpack optimizations
- Local Mongo, Model, View(React), Controller tests
