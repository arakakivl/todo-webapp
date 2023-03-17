# ToDo-WebApp
.NET backend with a nosql database (mongodb) and typescript as the mainly language to the frontend.

## Running
First, clone the repository.
```
git clone https://github.com/arakakiv/todo-webapp
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

### Running by dotnet CLI
**Requirements**:
 - .NET SDK 6.x
 - NodeJS, npm and typescript

First of all, go to `Program.cs` and update the database scheme to "In memory database".
```
cd src/Todo.WebApp
nano Program.cs // Open it with your favorite text editor
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
