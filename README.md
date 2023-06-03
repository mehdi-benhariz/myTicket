<h1 align="center">MyTicket 🎟️</h1>

<p align="center">
  <b>A ticket booking and management system</b>
  <br>
  <i>Backend: NestJS, TypeORM, PostgreSQL</i>
  <br>
  <i>Frontend: Next.js, TypeScript, Tailwind CSS</i>
</p>

## 🚀 Getting Started

To get started with MyTicket, follow the instructions below for installation and usage.

### ⚙️ Backend Installation

Before running the backend, make sure you have the following dependencies installed:

- [Node.js](https://nodejs.org) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org) (v12 or higher)

1. Clone the repository:

   ```
   git clone https://github.com/your-username/myticket-backend.git
   ```
#### Navigate to the backend directory:

```
cd server
```
#### Install the dependencies:

```
npm install
```
#### Set up the database connection:
Create a new PostgreSQL database for MyTicket.
Update the database connection details in the ormconfig.json file.

#### Run the database migrations:

```
npm run typeorm:migrate
```
### 💻 Frontend Installation
Clone the repository:
```
git clone https://github.com/your-username/myticket-frontend.git
```
Navigate to the frontend directory:
```
cd myticket-frontend
```
Install the dependencies:

```
npm install
```
### 🎯 Usage
Backend
Start the backend server:

```
npm run start:dev
```
The backend API will be available at http://localhost:3000/api/v1.

Frontend
Start the frontend development server:

```
npm run dev
```
The frontend application will be available at http://localhost:4000.

### 🌱 Seeding the Database
To quickly populate the database with dummy data for testing and development, you can use the provided seed script.

Make sure the backend server is running.

Navigate to the backend directory:
```
cd server
```
Run the seed script:
```bash
./seed_db.sh
```
This script will add dummy events and tickets to the database.

### 🤝 Contributing
Contributions are welcome! If you encounter any issues or have suggestions for improvements, please create an issue or submit a pull request.

### 📝 License
This project is licensed under the MIT License.

