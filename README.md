# Notes App - Envolvers Technical Test

A full-stack notes application with categorization and filtering capabilities.

## Features

- Create, edit, and delete notes
- Archive/unarchive notes
- Categorize notes with tags
- Filter notes by category
- Separate views for active and archived notes

## Technologies

### Backend
- Node.js (v18+)
- Express
- Sequelize (ORM)
- PostgreSQL (v15+)

### Frontend
- React (v18)
- TypeScript
- Vite
- Tailwind CSS
- Axios

## Installation

1. Clone the repository

2. Install dependencies and setup database:
   ```bash
   ./setup.sh

3. Configure your PostgreSQL credentials in backend/.env

4. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

5. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```
### Default User

- **Username:** `admin`
- **Password:** `password`

## Project Structure

```
backend/
  src/
    controllers/
    models/
    repositories/
    middleware/
    routes/
    services/
    config/
frontend/
  src/
    components/
    context/
    pages/
    types/
```

**Made by Rodriguez Carlos.**