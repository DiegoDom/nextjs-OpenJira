# NextJS OpenJira App
## Instrucciones

Para correr localmente, se necesita la base de datos
* El -d, significa __detached__
```
docker-compose up -d
```

* MongoDB URL local:
```
mongodb://localhost:27017/entriesdb
```

Crear el archivo __.env__. Tomar __.env.example__ como ejemplo/plantilla.
<br/>

Correr el seeder en la url: __http://localhost:3000/api/seed__.