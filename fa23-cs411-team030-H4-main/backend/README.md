## Installation and Setup

### Prerequisites
- Node.js
- MySQL

### Install Dependencies
```bash
npm install
```
### Database Setup
Deployed database on [Google Cloud Platform](https://cloud.google.com/) SQL

Connect to database by creating .env.production file (Environment Variables)
```
DB_HOST=      //11.22.33.44
DB_USER=      //user
DB_PASS=      //password123
DB_NAME=      //mydatabase
```

### Running the Server
```
npm run dev
```

## Docker command for testing
```
docker run --name mysql-dev -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=mysqldb -e MYSQL_USER=user -e MYSQL_PASSWORD=password -p 3306:3306 -d mysql:latest
```
