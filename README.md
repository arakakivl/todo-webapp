# ToDo-WebApp
Aplicação web API + MVC que ajuda a você organizar as tão "amadas" tarefas e responsabilidades!

O front-end é feito em **TypeScript** e o back-end é construído em **.NET** + banco de dados **mongo**.

## Fazendo download ou clonando o repositóio
Faça o download do repositório ou execute `git clone` para cloná-lo para sua máquina.

```
git clone https://github.com/arakakiv/todo-webapp
```

Vá para a pasta clonada

```
cd todo-webapp
```

## Executando pelo Docker
**Requisitos**:
 - Docker Engine
 - Docker Compose

Use o comando `docker-compose up --build` para **buildar** e **executar** todas as imagens necessárias.

```
docker-compose up --build             
```

Finalmente, **navegue até http://localhost:5223!**

## Executando pela dotnet cli
**Requisitos**:
 - .NET SDK 6.x
 - NodeJS e npm

Primeiramente, vá até `Program.cs`, na pasta src/Todo.WebApp
```
cd src/Todo.WebApp
nano Program.cs // Abra com o seu editor de texto/código favorito
```
Troque `ItemsRepository` por `InMemItemsRepository`
```
// builder.Services.AddSingleton<IItemsRepository, ItemsRepository>(); (estava assim)
builder.Services.AddSingleton<IItemsRepository, InMemItemsRepository>(); // Ficará assim!
```

Instale as dependências com os seguintes comando:
```
dotnet restore
npm install
```
Por fim, execute o seguinte comando para executar a aplicação:
```
dotnet run
```
**Detalhe:** Os dados não serão salvos, já que não há a execução do banco de dados, e sim apenas do aplicativo.

## Obrigado!
O código ainda é sujeito a alterações!
