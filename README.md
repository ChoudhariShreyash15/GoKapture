# GoKapture_Assignment

Certainly! Here's the updated README file that includes instructions for using the MySQL CLI within the Dockerized environment.

---

# Dockerized Application with MySQL Database

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
   - [Clone the Repository](#clone-the-repository)
   - [Environment Variables](#environment-variables)
   - [Build and Run the Application](#build-and-run-the-application)
4. [Application Structure](#application-structure)
5. [Usage](#usage)
   - [Accessing the MySQL CLI](#accessing-the-mysql-cli)
6. [Stopping and Cleaning Up](#stopping-and-cleaning-up)
7. [Contributing](#contributing)
8. [License](#license)

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

### Environment Variables

Create a `.env` file in the root of the project and configure the following environment variables:

```bash
# MySQL Database Configuration
MYSQL_ROOT_PASSWORD= admin
MYSQL_DATABASE= gokapture
MYSQL_USER= user
MYSQL_PASSWORD= admin

# Application Configuration
APP_PORT=3000
```

You can customize the values based on your needs. The `.env` file is used by Docker Compose to inject the environment variables into the containers.

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

## Application Structure

Here's a brief overview of the project structure:

```plaintext
.
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile            # Dockerfile for the application
├── src/                  # Source code of the application
├── database/             # Database initialization scripts
├── .env                  # Environment variables file
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

   ```bash
   docker exec -it your_mysql_container_name mysql -u your_user -p
   ```

   Replace `your_mysql_container_name` with the actual container name, and `your_user` with the MySQL username. You'll be prompted for the MySQL password.

   After entering the password, you'll be in the MySQL CLI, where you can run SQL commands directly.

## Stopping and Cleaning Up

To stop the containers:

```bash
docker-compose down
```

This command will stop and remove the containers but will keep the volumes intact. If you want to remove the volumes as well, use:

```bash
docker-compose down -v
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README now includes a section on accessing the MySQL CLI within the Docker container, providing a more comprehensive guide for interacting with the database.
