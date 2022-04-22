
<br />
<div align="center">

  <h3 align="center">Sistemas Distribuidos: Tarea 01</h3>

  <p align="center">
    Fernando Burón, Felipe Condore
  </p>
</div>


## Acerca del proyecto

El objetivo de esta tarea consiste en poner en práctica los conceptos de Caché y RPC vistos en clases. Para ello se debe hacer uso de tecnlogías que permitan la solución a esta problemática



### 🛠 Construído con:

Esta sección muestra las tecnologías con las que fue construído el proyecto.

* [Node.js](https://nodejs.org/es/)
* [gRPC](https://grpc.io)
* [Redis](https://redis.io)
* [Postgres](https://www.postgresql.org)
* [Python](https://www.python.org)
* [Docker](https://www.docker.com)


## 🔰 Comenzando

Para iniciar el proyecto, primero hay que copiar el repositorio y luego escribir el siguiente comando en la consola:
* docker
```sh
docker-compose --build -d
```


### Pre-Requisitos

Tener Docker y Docker Compose instalado
* [Installation Guide](https://docs.docker.com/compose/install/)



<!-- USAGE EXAMPLES -->
## 🤝 Uso

La aplicación tiene una API, que a través del método GET se pueden hacer las siguientes consultas:

### Query
Busca el inventario según la coincidencia de la palabra otorgada, busca en Cache y luego en la Base de Datos.
```curl
curl −−location −−request GET http://localhost:3000/inventory/search?q=Disk
```
#### 
- ☄METODO: GET
- 🔑KEY: q
- 📃VALUE: \<palabra a buscar\>

#### Response example
```js
{
    "items": [
        {
            "id": 10,
            "name": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
            "price": 109,
            "category": "electronics",
            "count": 470
        }
    ]
}
```
### Reset
Borra el cache de Redis.
```curl
curl −−location −−request GET http://localhost:3000/reset
```
#### Response
```sh
Cache flushed
```

### Keys
Muestra las Keys que ha guardado el cache.
```curl
curl −−location −−request GET http://localhost:3000/keys
```
#### Response
```js
[
    "SSD",
    "Slim",
    "Mens",
    "Disk",
    "6"
]
```

