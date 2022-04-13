FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal AS base
WORKDIR /app
EXPOSE 5223

ENV ASPNETCORE_URLS=http://+:5223

FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build
COPY ["src/Todo.WebApp/Todo.WebApp.csproj", "src/Todo.WebApp/"]
COPY ["src/Todo.Application/Todo.Application.csproj", "src/Todo.Application/"]
COPY ["src/Todo.Infrastructure/Todo.Infrastructure.csproj", "src/Todo.Infrastructure/"]
COPY ["src/Todo.Core/Todo.Core.csproj", "src/Todo.Core/"]
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
RUN dotnet restore "src/Todo.WebApp/Todo.WebApp.csproj"
COPY . .
WORKDIR "/src/Todo.WebApp"
RUN npm install
RUN dotnet build "Todo.WebApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Todo.WebApp.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Todo.WebApp.dll"]
