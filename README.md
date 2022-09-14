# ToDo-WebApp
.NET backend with a nosql database (mongodb) and typescript as the mainly language to the frontend.

## Fazendo download ou clonando o repositóio

## Running
First, clone the repository.
```
git clone https://github.com/arakakiv/todo-webapp
```

Vá para a pasta clonada

```
cd todo-webapp
```

### Running within Docker containers
**Requirements**:
 - Docker Engine
 - Docker Compose

Just build and run the app with the following command:

```
docker-compose up --build             
```

Finally, navigate to the specified port.

## Running by Docker CLI
**Requisitos**:
 - .NET SDK 6.x
 - NodeJS, npm and typescript

First of all, go to `Program.cs` and update the database scheme to "In memory database".
```
cd src/Todo.WebApp
nano Program.cs // Abra com o seu editor de texto/código favorito
```
Change `ItemsRepository` by `InMemItemsRepository`
```
// builder.Services.AddSingleton<IItemsRepository, ItemsRepository>();
builder.Services.AddSingleton<IItemsRepository, InMemItemsRepository>();
```

Restore the dependencies with the following commands:
```
dotnet restore
npm install
```
Finally, execute the app with `dotnet run`:
```
dotnet run
```
