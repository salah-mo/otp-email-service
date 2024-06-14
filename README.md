# OTP Email Service

## Overview

This project is an OTP (One-Time Password) email service built using Java and the Spring Boot framework. The service
generates and sends OTPs via email for user authentication purposes.

## Features

- Generate OTPs
- Send OTPs via email
- Configurable OTP expiration time
- Easy integration with existing systems

## Prerequisites

- Java 11 or higher
- Maven 3.6.0 or higher

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/salah-mo/otp-email-service.git
   cd otp-email-service
   ```

2. **Build the project using Maven:**
   ```sh
   mvn clean install
   ```

3. **Run the application:**
   ```sh
   mvn spring-boot:run
   ```

## Configuration

Configure the application by editing the `application.properties` file located in the `src/main/resources` directory.
Below are the key configurations:

```properties
# SMTP server configuration
spring.mail.host=smtp.example.com
spring.mail.port=587
spring.mail.username=your-email@example.com
spring.mail.password=your-email-password
spring.mail.properties.mail.smtp.starttls.enable=true
```

## Usage

The OTP email service can be accessed through the following API endpoint:

### Base URL

The Base URL is the root URL for all the API, if you are running the application locally, your base URL will be:

```
http://localhost:8080
```

### Endpoints

#### `/api/otp/generate`

- **Method:** `POST`
- **Description:** Generates a new OTP.
- **Request Body:** `{ "email": "user@example.com" }`
- **Response:** `{ "status": "success", "message": "OTP has been sent to your email." }`

#### `/api/otp/verify`

- **Method:** `POST`
- **Description:** Validates the provided OTP.
- **Request Body:** `{ "email": "user@example.com", "otp": "123456" }`
- **Response:** `{ "status": "success", "message": "OTP verified successfully." }`

### Expired OTP

In case the OTP is expired, the API will return an HTTP status code and a message indicating that the OTP has expired.
For example:

```json
    {
  "status": "error",
  "message": "OTP has expired."
}
```

### Error Handling

In case of an error, the API will return an HTTP status code and a message describing the error. For example:

```json
{
  "status": "error",
  "message": "Invalid OTP."
}
```

### Dependencies

The project relies on the following dependencies:

- Spring Boot Starter Mail
- Spring Boot Starter Web
- Spring Boot Starter Security
- Java Mail API

These dependencies are specified in the `pom.xml` file.
