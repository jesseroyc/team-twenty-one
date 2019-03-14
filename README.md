
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


curl -L http://toolbelt.treasuredata.com/sh/install-ubuntu-trusty-td-agent2.sh | sh

sudo /etc/init.d/td-agent start

tail /var/log/td-agent/td-agent.log

gem install fluentd --no-rdoc --no-ri

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 36A1D7869245C8950F966E92D8576A8BA88D21E9

sudo sh -c "echo deb https://get.docker.com/ubuntu docker main > /etc/apt/sources.list.d/docker.list"

sudo apt-get update

sudo apt-get install lxc-docker

docker --version

Docker version 1.5.0, build a8a31ef

sudo gpasswd -a sammy docker

sudo service docker restart

mkdir ~/fluentd-docker && cd ~/fluentd-docker

sudo nano Dockerfile

FROM ruby:2.2.0
MAINTAINER kiyoto@treausuredata.com
RUN apt-get update
RUN gem install fluentd -v "~>0.12.3"
RUN mkdir /etc/fluent
RUN apt-get install -y libcurl4-gnutls-dev make
RUN /usr/local/bin/gem install fluent-plugin-elasticsearch
ADD fluent.conf /etc/fluent/
ENTRYPOINT ["/usr/local/bundle/bin/fluentd", "-c", "/etc/fluent/fluent.conf"]

sudo nano fluent.conf

<source>
  type tail
  read_from_head true
  path /var/lib/docker/containers/*/*-json.log
  pos_file /var/log/fluentd-docker.pos
  time_format %Y-%m-%dT%H:%M:%S
  tag docker.*
  format json
</source>
# Using filter to add container IDs to each event
<filter docker.var.lib.docker.containers.*.*.log>
  type record_transformer
  <record>
    container_id ${tag_parts[5]}
  </record>
</filter>

<match docker.var.lib.docker.containers.*.*.log>
  type elasticsearch
  logstash_format true
  host "#{ENV['ES_PORT_9200_TCP_ADDR']}" # dynamically configured to use Docker's link feature
  port 9200
  flush_interval 5s
</match>

docker build -t fluentd-es .

docker images

cd ~

docker run -d -p 9200:9200 -p 9300:9300 --name es dockerfile/elasticsearch

docker ps

docker run -d --link es:es -v /var/lib/docker/containers:/var/lib/docker/containers fluentd-es

docker ps

curl -XGET 'http://localhost:9200/_all/_search?q=*'

{"took":66,"timed_out":false,"_shards":{"total":5,"successful":5,"failed":0},"hits":{"total":0,"max_score":null,"hits":[]}}
{"took":59,"timed_out":false,"_shards":{"tod","_id":"AUwLaKjcnpi39wqZnTXQ","_score":1.0,"_source":{"log":"2015-03-12 00:35:44 +0000 [info]: following tail of /var/lib/docker/containers/6abeb6ec0019b2198ed708315f4770fc7ec6cc44a10705ea59f05fae23b81ee9/6abeb6ec0019b2198ed708315f4770fc7ec6cc44a10705ea59f05fae23b81ee9-json.log\n","stream":"stdout","container_id":"6abeb6ec0019b2198ed708315f4770fc7ec6cc44a10705ea59f05fae23b81ee9","@timestamp":"2015-03-12T00:35:44+00:00"}}]}}

Step 8 — Taking Event Logs to the Next Level
Now that your container events are being saved by Elasticsearch, what should you do next? There are plenty of useful things to do with Elasticsearch. If you're looking for ideas, you may want to check out:

Basic Elasticsearch operations
Adding a dashboard so you can visualize your logs

Use Case 1: Real-time Log Search and Log Archiving

Use Case 2: Centralized Application Logging

Data Structure


`Many to many`
`Current arduino inout`
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


`Atomic taxin but valuable`
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


`Optimized Data Construct`
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

`Finally timestamps have set`
`step size. To export for graph.`

  `0=tmp`     `2-lum`
val:[23.2,21.3,54.2,....]
        `1=moi`

`use modulo indexing`
`single array expansion query.`