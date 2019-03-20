DEVELOPED WITH

         ___        ______     ____ _                 _  ___  
        / \ \      / / ___|   / ___| | ___  _   _  __| |/ _ \ 
       / _ \ \ /\ / /\___ \  | |   | |/ _ \| | | |/ _` | (_) |
      / ___ \ V  V /  ___) | | |___| | (_) | |_| | (_| |\__, |
     /_/   \_\_/\_/  |____/   \____|_|\___/ \__,_|\__,_|  /_/ 
 ----------------------------------------------------------------- 

Node.js test app featuring React, MongoDb, Express, Webpack, Babel, 
NGINX, PM2, Docker and Docker-Compose. It was developed in a Cloud IDE 
hosted in the same AWS EC2 Ubuntu 16.04 server it was deployed on.

To get started clone the repo and install Docker & Docker-Compose.

```
sudo yum update -y                 # Update environment
sudo yum install docker            # Install docker
sudo service docker start          # Start docker service
sudo usermod -a -G docker ec2-user # Add some user to group
```
\
Stage project for distribution

```
cd node
npm install
npm run pro:build
```
\
This will transpile src files to ES5 and start the local
server rendering build.

```
npm install
npm run dev:start
```
\
TO DO: Before using `docker-compose`

> NGINX still needs testing for a proper release. Currently, set
> frontend and backend hosts to the same ip load balance 1 app.

\
Local Mongo Start

```
cd mongo                         # go to /mongo directory
docker build --tag=mongo .       # build image tagged mongo
docker run -p 27017:27017 mongo  # start container and bind port
npm run dev:babel                # transpile code with babel
npm run dev:start                # start local server
```
\
On an ec2 server docker-compose is not symbolicly linked correctly.

Setting up docker-compose

```
sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose                 # Places curl command into /usr/local/bin
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose # Sym link it properly with this!
```
\
Build docker container for node/pm2, nginx proxy, and mongo database.
Make sure to be in your docker-compose.yml folder.

```
docker-compose build -docker
docker-compose up
```
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
CTRL + C to stop docker deployment gracefully. Remove built docker
environment using the following. At the moment, the '-f' prepend for
faster testing. Careful when executing these in your environment.

```
docker container stop $(docker container ls -aq) # stop containers
docker container rm $(docker container ls -aq)   # remove containers
docker rmi $(docker images -aq)                  # remove current images 
docker system prune --volumes -f                 # restore device space used
```
\
The MongoDb scripts may need some extended permissions, chmod your
group with executen `x` permissions. Remove permissions with `-x`.

```
chmod +x run.sh
chmod +x set_mongodb_password.sh
```
\
The ubuntu container might need extended permissions on docker.sock.

```
sudo chmod 666 /var/run/docker.sock
```
\
This project receives post requests from an arduino MK2 anywhere with
wifi and adds the values to the database with the following data structure

Many to many

Current arduino inout
\
```
[
  {
  inp:[
      {
        typ: "tmp",
        _id: 0,
        val: 23.2,
        tim: 20387
      }
    ]
  },
  {
  inp:[
      {
        typ: "moi",
        _id: 0,
        val: 23.2,
        tim: 20387
      }
    ]
  },
  {
  inp:[
      {
        typ:"lum",
        _id:0,
        val:23.2,
        tim:20387
      }
    ]
  }
]


// Atomic taxin but valuable
{
inp:[
  {
    _id:0,
    tim:3232421
  }
],
[
  {
    typ:"tmp",
    val:23.2,
    typ:"moi",
    val:21.3,
    typ:"lum",
    tim:54.2
  }
]
}


// Optimized Data Construct`
{
  inp:[
    {
      _id:0,
      typ:["tmp","moi","lum"],
      val:[23.2,21.3,54.2],
      tim:323422
    }
  ]
}

// Finally timestamps have set`
// step size. To export for graph.`

  `0=tmp`     `2-lum`
val:[23.2,21.3,54.2,....]
        `1=moi`

// use modulo indexing`
// `single array expansion query.`
```
\
Next Releases:

- Material UI frontend with graphs.
- Fluent Logging Container
- Optimized bundles
- Service worker implementation
- Possible react eject
- Babel & Webpack optimizations
- Local Mongo, Model, View(React), Controller tests
-Util specific folder