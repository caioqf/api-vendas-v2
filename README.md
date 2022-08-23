API de vendas para praticar os aprendizados de REST, Typescript, PostgreSQL e Docker

# Notas:

##### Imagem docker PostgreSQL: 
$ docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5431:5432 -d postgres


##### Imagem docker REDIS: 
$ docker run --name redis -p 6379:6379 -d -t redis:alpine


## Client
$ docker run --name redis-client -v redisinsight:/db -p 8001:8001 -d -t redislabs/redisinsight:latest

## Server
$ docker run --name redis-db -p 6379:6379 -d -t redis:alpine


### Pontos de atenção:

-
