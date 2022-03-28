# ToDo-Api
Uma API que ajuda a você organizar as tão "amadas" tarefas e responsabilidades!

O front-end é feito em **TypeScript** e o back-end é construído em **.NET** + banco de dados **mongo**.

## Como executar (pelo Docker)
**Requisitos**
 - Docker Engine

Faça o download do repositório ou execute `git clone` para cloná-lo para sua máquina.

```
git clone https://github.com/arakakiv/todo-api
```

Vá para a pasta baixada ou clonada

```
cd todo-api
```

Use o comando `docker build` para **buildar** o `Dockerfile` e crie uma conexão que terá os containers do banco de dados mongo e da aplicação em si:

```
docker build -t todo-api:v1 .
docker network create todo-api-network              
```

Finalmente, execute o container do banco de dados e depois o container da aplicação:

```
docker run -d --rm --name todo-api-data -p 27017:27017 -v todo-api-data:/data/db --network=todo-api-network mongo:4.4
docker run -it --rm -p 8080:80 -e MongoDbSettings:Host=todo-api-data --network=todo-api-network todo-api:v1
```

Acesse `http://localhost:8080`, **e pronto!**
