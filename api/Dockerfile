FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .

RUN mvn -q -DskipTests -DincludeScope=compile dependency:resolve

COPY src ./src
RUN mvn -q clean package -DskipTests

RUN mkdir -p /layers && \
    java -Djarmode=layertools -jar target/*.jar extract --destination /layers || \
    echo "[WARN] Layertools no disponible; continuará con fat jar"

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar /app/app.jar

RUN apt-get update -y && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
