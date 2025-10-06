# Hazelcast POC API - Spring Cache

API REST con Spring Boot que demuestra el uso de **Spring Cache** con **Hazelcast** como proveedor de caché distribuido.

## Características

- ✅ Spring Cache con anotaciones declarativas (`@Cacheable`, `@CacheEvict`)
- ✅ Hazelcast embebido como backend de caché
- ✅ Configuración mediante `application.properties` y `hazelcast.yaml`
- ✅ Auto-configuración de Spring Boot (sin código Java de configuración)
- ✅ API REST completa para gestión de contactos
- ✅ Endpoints de monitoreo y gestión de caché
- ✅ Logging detallado de operaciones de caché

## Tecnologías

- Java 21
- Spring Boot 3.5.6
- Spring Cache
- Hazelcast 5.5.0
- Maven

## Estructura del proyecto

```
src/main/java/com/alexdevvv/
├── config/
│   └── HazelcastConfig.java          # Configuración de Hazelcast y Spring Cache
├── controller/
│   ├── ContactController.java        # API REST de contactos
│   └── CacheController.java          # API de gestión de caché
├── model/
│   └── Contact.java                  # Modelo de datos
├── repository/
│   └── ContactRepository.java        # Repositorio JPA
├── service/
│   └── ContactService.java           # Lógica de negocio con caché
└── HazelcastPocApplication.java      # Clase principal
```

## Configuración

### application.properties

```properties
# Spring Cache con Hazelcast
spring.cache.type=hazelcast
spring.cache.cache-names=contacts

# Configuración de Hazelcast
spring.hazelcast.config=classpath:hazelcast.yaml

# Logging
logging.level.org.springframework.cache=DEBUG
```

### hazelcast.yaml

Spring Boot detecta automáticamente este archivo y configura Hazelcast:

```yaml
hazelcast:
  instance-name: hazelcast-poc-api
  cluster-name: hazelcast-poc-cluster
  
  map:
    contacts:
      time-to-live-seconds: 0      # Sin expiración
      max-idle-seconds: 1800        # 30 minutos
      eviction:
        eviction-policy: LRU
        size: 10000
```

### HazelcastConfig.java

Solo necesita `@EnableCaching` - Spring Boot hace el resto:

```java
@Configuration
@EnableCaching
public class HazelcastConfig {
    // Spring Boot auto-configura HazelcastInstance
}
```

## API Endpoints

### Gestión de Contactos

#### Obtener todos los contactos
```bash
GET http://localhost:8080/api/contacts
```

#### Obtener contacto por ID (con caché)
```bash
GET http://localhost:8080/api/contacts/{id}
```

#### Crear contacto
```bash
POST http://localhost:8080/api/contacts
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+54 11 1234-5678"
}
```

#### Actualizar contacto (invalida caché)
```bash
PUT http://localhost:8080/api/contacts/{id}
Content-Type: application/json

{
  "name": "Juan Pérez Actualizado",
  "email": "juan.nuevo@example.com",
  "phone": "+54 11 8765-4321"
}
```

#### Eliminar contacto (invalida caché)
```bash
DELETE http://localhost:8080/api/contacts/{id}
```

### Gestión de Caché

#### Obtener estadísticas del caché
```bash
GET http://localhost:8080/api/cache/stats
```

Respuesta:
```json
{
  "instanceName": "hazelcast-poc-api",
  "clusterName": "hazelcast-poc-cluster",
  "clusterSize": 1,
  "contactsCache": {
    "size": 5,
    "localSize": 5,
    "hits": 12,
    "getOperationCount": 15,
    "putOperationCount": 5,
    "removeOperationCount": 0
  }
}
```


## Cómo funciona el caché

### @Cacheable en findById()

```java
@Cacheable(value = "contacts", key = "#id", unless = "#result == null || #result.isEmpty()")
public Optional<Contact> findById(Long id) {
    // Este código solo se ejecuta en Cache MISS
    return contactRepository.findById(id);
}
```

**Flujo:**
1. Primera llamada → **Cache MISS** → Ejecuta el método → Guarda en caché
2. Segunda llamada (mismo ID) → **Cache HIT** → Devuelve desde caché (sin ejecutar el método)

### @CacheEvict en save()

```java
@CacheEvict(value = "contacts", key = "#contact.id")
public Contact save(Contact contact) {
    // Después de guardar, se elimina de la caché
    return contactRepository.save(contact);
}
```

**Flujo:**
1. Ejecuta el método `save()`
2. Elimina la entrada de la caché
3. Próxima consulta será Cache MISS y recargará datos actualizados

## Ejemplo de uso

### 1. Crear un contacto
```bash
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"María García","email":"maria@example.com","phone":"+54 11 5555-1234"}'
```

### 2. Consultar el contacto (Cache MISS - primera vez)
```bash
curl http://localhost:8080/api/contacts/1
```
**Log:** `Cache MISS - Buscando Contact ID: 1 en el repositorio`

### 3. Consultar el mismo contacto (Cache HIT)
```bash
curl http://localhost:8080/api/contacts/1
```
**Log:** Sin mensaje de "Cache MISS" - devuelto desde caché

### 4. Ver estadísticas
```bash
curl http://localhost:8080/api/cache/stats
```

### 5. Actualizar el contacto (invalida caché)
```bash
curl -X PUT http://localhost:8080/api/contacts/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"María García Actualizada","email":"maria.nueva@example.com","phone":"+54 11 9999-8888"}'
```
**Log:** `Guardando Contact ID: 1 y evictando de la caché`

### 6. Consultar nuevamente (Cache MISS - caché invalidado)
```bash
curl http://localhost:8080/api/contacts/1
```
**Log:** `Cache MISS - Buscando Contact ID: 1 en el repositorio`

## Ejecutar la aplicación

### Requisitos
- Java 21
- Maven 3.8+

### Compilar
```bash
mvn clean package
```

### Ejecutar
```bash
mvn spring-boot:run
```

O ejecutar el JAR:
```bash
java -jar target/hazelcast-poc-api-0.0.1-SNAPSHOT.jar
```

La aplicación estará disponible en: `http://localhost:8080`

## Ventajas de esta arquitectura

1. **Sin código de configuración**: Solo archivos de propiedades
2. **Abstracción**: Código desacoplado del proveedor de caché
3. **Declarativo**: Anotaciones simples (`@Cacheable`, `@CacheEvict`)
4. **Mantenible**: Configuración centralizada en archivos
5. **Escalable**: Fácil migrar a Hazelcast distribuido o cambiar a Redis
6. **Testeable**: Fácil desactivar caché en tests
7. **Monitoreable**: Endpoints de estadísticas incluidos
8. **Spring Boot native**: Auto-configuración completa

## Autor

Alexis (alexis.castellano@gmail.com)
