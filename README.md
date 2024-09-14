# CRM Dashboard

A comprehensive Customer Relationship Management (CRM) dashboard built with modern web technologies. This project provides a robust solution for managing companies, customers, projects, and tasks in a user-friendly interface. Forked from NuxtUI Dashboard template.

## Features

- Company management
- Customer tracking
- Project and task organization
- Note-taking functionality
- Responsive design for desktop and mobile use

## Tech Stack

- Nuxt 3: Vue.js framework for building efficient and scalable web applications
- Supabase: Open-source Firebase alternative for backend services
- Prisma: Next-generation ORM for Node.js and TypeScript
- Pinia: State management for Vue.js applications
- TailwindCSS: Utility-first CSS framework
- Nuxt UI: UI component library for Nuxt.js
- Nuxt Schema: Schema validation for Nuxt.js

## Prerequisites

- Node.js (v14 or later)
- Yarn package manager
- PostgreSQL database

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/crm-dashboard.git
   cd crm-dashboard
   ```

2. Install dependencies:

   ```
   yarn install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Fill in the required environment variables, including your database connection string

4. Set up the database:

   ```
   npx prisma migrate dev --name init
   ```

5. Seed the database with sample data:
   ```
   yarn seed
   ```

## Running the Application

1. Start the development server:

   ```
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

## Database Management

- Clear the database: `yarn cleardb`
- Seed the database: `yarn seed`
- Create a new migration: `npx prisma migrate dev --name <migration-name>`

## Building for Production

yarn build

This command generates a production-ready build of your application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
