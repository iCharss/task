#!/bin/bash

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Configure database
echo "Configuring database..."
createdb notes_app || echo "Database already exists or couldn't be created"
cd backend
npm run setup-db
cd ..

echo "Installation completed!"
echo "To start backend: cd backend && npm run dev"
echo "To start frontend: cd frontend && npm run dev"