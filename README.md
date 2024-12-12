# Aplicación CRUD de Noticias

## Descripción
Este proyecto es una aplicación web para gestionar noticias. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las noticias almacenadas en una base de datos MySQL. El backend está desarrollado en Java utilizando Spring Boot, mientras que el frontend usa HTML, JavaScript y Bootstrap para una interfaz moderna y responsiva.

## Tecnologías utilizadas
- **Backend:** Java, Spring Boot, Spring Data JPA, Spring MVC
- **Base de datos:** MySQL
- **Frontend:** HTML, JavaScript, Bootstrap 5
- **Dependencias principales:** 
  - Spring Web
  - Spring Data JPA
  - MySQL Connector
  - Thymeleaf (opcional si decides usarlo en vez de HTML puro)

## Características
- Crear, leer, actualizar y eliminar noticias.
- Interfaz de usuario intuitiva y responsiva.
- Comunicación entre frontend y backend mediante APIs REST.
- Validación básica en el frontend y backend.

## Requisitos previos
Antes de ejecutar este proyecto, asegúrate de tener instalados los siguientes componentes:
- **Java Development Kit (JDK) 11 o superior**
- **Maven o Gradle** (dependiendo de la elección inicial del proyecto)
- **MySQL Server**
- **IDE** (como IntelliJ IDEA, Eclipse, o VS Code)
- **Postman** (opcional, para probar las APIs)

## Configuración del entorno

**Clonar el repositorio**
   ```bash
   git clone https://github.com/MasterCarl109/noticiasSpringBoot.git

## Configurar la base de datos MySQL
- Crear una base de datos llamada news.

## Configurar las credenciales de la base de datos
- Abre el archivo src/main/resources/application.properties y configura las credenciales de acceso:
  ```bash
  spring.datasource.url=jdbc:mysql://localhost:3306/news
  spring.datasource.username=root
  spring.datasource.password=
  spring.jpa.hibernate.ddl-auto=update

## EndPoints de la API
-**GET /api/news **- Obtener todas las noticias.
-**GET /api/news/{id} **- Obtener una noticia específica.
-**POST /api/news **- Crear una nueva noticia.
-**PUT /api/news/{id} **- Actualizar una noticia existente.
-**DELETE /api/news/{id} **- Eliminar una noticia.

## Frontend
-El frontend está desarrollado en HTML, JavaScript y Bootstrap. Puedes acceder al archivo principal en:
  ```bash
src/main/resources/static/index.html



  
