# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SolidJS todo application with user authentication that connects to a Rails backend API. The frontend handles task management with create/delete operations and includes login/registration functionality.

Backend API repository: https://github.com/mkatoo/rails-todoapp

## Development Commands

- `npm run dev` or `npm start` - Start development server on http://localhost:3000
- `npm run build` - Build for production to `dist/` folder
- `npm run serve` - Preview production build
- `npm run lint` - Run Biome linter (check only)
- `npm run format` - Run Biome formatter and linter with auto-fix

## Code Style and Formatting

This project uses Biome for formatting and linting:
- Indentation: tabs
- Quote style: double quotes
- All recommended Biome rules enabled
- Import organization enabled

## Architecture

### Frontend Structure
- **Router**: Uses `@solidjs/router` with three main routes:
  - `/` - TaskList component (main todo interface)
  - `/login` - LoginForm component
  - `/register` - RegisterForm component
- **State Management**: Global token state managed via signals, passed down through props
- **Authentication**: JWT token-based auth stored in signals, redirects to login if no token
- **API Layer**: Centralized in `src/api.ts` with functions for auth and task operations

### Key Components
- `TaskList.tsx` - Main todo interface with CRUD operations
- `LoginForm.tsx` - User authentication 
- `RegisterForm.tsx` - User registration
- `Header.tsx` - Navigation/logout functionality

### API Integration
All API calls use Bearer token authentication. The backend URL is configured via `VITE_API_URL` environment variable.

## Tech Stack
- SolidJS with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Biome for linting/formatting