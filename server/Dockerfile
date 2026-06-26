# ---- Build & publish ----
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Restore first (better layer caching): copy only project files.
COPY Shva.TransactionSimulator.sln ./
COPY src/Shva.Domain/Shva.Domain.csproj src/Shva.Domain/
COPY src/Shva.Application/Shva.Application.csproj src/Shva.Application/
COPY src/Shva.Infrastructure/Shva.Infrastructure.csproj src/Shva.Infrastructure/
COPY src/Shva.API/Shva.API.csproj src/Shva.API/
RUN dotnet restore src/Shva.API/Shva.API.csproj

# Copy the rest and publish.
COPY . .
RUN dotnet publish src/Shva.API/Shva.API.csproj -c Release -o /app/publish /p:UseAppHost=false

# ---- Runtime ----
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
COPY --from=build /app/publish ./
ENTRYPOINT ["dotnet", "Shva.API.dll"]
