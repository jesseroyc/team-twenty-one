
DEVELOPED USING

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
As suggested: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html


> docker info                        # If responds with cannot connect, then...

> sudo yum update -y                 # Update environment

> sudo yum install docker            # Install docker

> sudo service docker start          # Start docker service

> sudo usermod -a -G docker ec2-user # Add ec2 user to group


To get docker-compose setup through symbolic links


> sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
> sudo chmod +x /usr/local/bin/docker-compose # Places curl command into /usr/local/bin

> ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose # Sym link it properly with this!


Build node project


> cd node
> npm install 
> npm run build

Preview running application in Cloud9!


> npm start


Edit nginx in nginx.conf by changing the value of server_nam


Begin docker deployment environment


> cd .. & docker-compose build -docker
> docker-compose up
> docker ps -a                        # See all containers
> docker exec -it [container-id] bash # Enter terminal in container


Stop docker deployment environment


> docker system prune --volumes  # Always needed
> docker rmi $(docker images -q) # Rarely needed
> docker kill $(docker ps -q)    # Ocassionally needed


Handy Commands:

MongoDb Permission Issue Fix

> cd ~/environment/srv/mongo
> chmod +x run.sh
> chmod +x set_mongodb_password.sh

Docker Socket Ubuntu 16 Permission Fix

> sudo chmod 666 /var/run/docker.sock