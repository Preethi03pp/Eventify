# Use OpenJDK 20 as base image
FROM openjdk:20-jdk-alpine

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Build the Spring Boot app
RUN ./mvnw clean package -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the JAR
CMD ["java", "-jar", "target/eventease-0.0.1-SNAPSHOT.jar"]
