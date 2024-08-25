# GoKapture_Assignment

Certainly! Here's the updated README file that includes instructions for using the MySQL CLI within the Dockerized environment.

---

# Dockerized Application with MySQL Database

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
   - [Clone the Repository](#clone-the-repository)
   - [Build and Run the Application](#build-and-run-the-application)
4. [Application Structure](#application-structure)
5. [Usage](#usage)
   - [Accessing the MySQL CLI](#accessing-the-mysql-cli)
6. [Stopping and Cleaning Up](#stopping-and-cleaning-up)

## Introduction

This project is a Dockerized application that uses MySQL as its database. Docker ensures that the application and the database can run consistently across different environments by containerizing the components. This README will guide you through the setup, configuration, and usage of the application.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started) (v19.03 or later)
- [Docker Compose](https://docs.docker.com/compose/install/) (v1.27 or later)
- [MySQL CLI](https://dev.mysql.com/downloads/installer/)
- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/downloads/)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### Build and Run the Application

Use Docker Compose to build and run the application:

```bash
docker-compose up --build
```

This command will:

1. Build the application image.
2. Start a MySQL container.
3. Start the application container.

Once the containers are up and running, the application should be accessible at `http://localhost:3000` (or the port you specified).

If you get the following error then follow the steps given below:
```
"error": {
            "code": "ER_NOT_SUPPORTED_AUTH_MODE",
            "errno": 1251,
            "sqlMessage": "Client does not support authentication protocol requested by server; consider upgrading MySQL client",
            "sqlState": "08004",
            "fatal": true
        }
```

### Steps:

1. **Access the MySQL container:**

   ```bash
   docker exec -it mysqlcontainer mysql -u root -p
   ```

2. **Run the following SQL commands:**

   ```sql
   ALTER USER 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'admin';
   FLUSH PRIVILEGES;
   ```

   This command changes the authentication method for the `admin` user to `mysql_native_password`.

3. **Restart your Node.js application** if it’s running, or **rerun your tests** in Postman.

   ```bash
   docker-compose down -v
   docker-compose up -d --build
   ```

## Application Structure

Here's a brief overview of the project structure:

```plaintext
.
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile            # Dockerfile for the application
├── src/                  # Source code of the application
├── database/             # Database initialization scripts
└── README.md             # This file
```

## Usage

### Accessing the MySQL CLI

You can access the MySQL CLI within the Docker container to interact with your database directly. To do this, follow these steps:

1. **Get the MySQL container name:**

   ```bash
   docker ps
   ```

   This command will list all running containers. Look for the container name associated with your MySQL instance.

2. **Access the MySQL CLI:**

   Once you have the container name, you can access the MySQL CLI using the following command:
   Default Name: mysqlcontainer

   ```bash
   docker exec -it mysqlcontainer mysql -u root -padmin
   ```

   Now you'll be in the MySQL CLI, where you can run SQL commands directly.

## Stopping and Cleaning Up

To stop the containers:

```bash
docker-compose down
```

This command will stop and remove the containers but will keep the volumes intact. If you want to remove the volumes as well, use:

```bash
docker-compose down -v
```
