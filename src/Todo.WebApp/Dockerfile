FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal AS base
WORKDIR /app
EXPOSE 5223

ENV ASPNETCORE_URLS=http://+:5223

FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build
RUN curl -fsSL https://deb.nodesource.com/setup_17.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
RUN npm install
WORKDIR /src
COPY ["src/Todo.Api/Todo.Api.csproj", "src/Todo.Api/"]
COPY ["src/Todo.Application/Todo.Application.csproj", "src/Todo.Application/"]
COPY ["src/Todo.Infrastructure/Todo.Infrastructure.csproj", "src/Todo.Infrastructure/"]
COPY ["src/Todo.Core/Todo.Core.csproj", "src/Todo.Core/"]
RUN dotnet restore "src/Todo.Api/Todo.Api.csproj"
COPY . .
WORKDIR "/src/src/Todo.Api"
RUN dotnet build "Todo.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Todo.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Todo.Api.dll"]