# Cinema Booking API

> API stands for Application Programming Interface, which is a set of definitions and protocols for building and integrating software. Simply put, they allow two pieces of software to communicate with each other through a pre-defined interface.

## Learning Objectives

- Design and build a database-backend API

## Introduction

So far, we've designed a database structure for a cinema booking system and implemented that design using an ORM. The next step is to build an API that allows the cinema and its customers to interact with the database.

Frontend applications usually won't interact with a database directly, especially if it's a web app; they'll instead send instructions to a server which will process those instructions and give back a response. We decide how the server receives instructions, processes them and responds back by creating an API.

## Setting up

The full database schema and seed file for this exercise has already been implemented, your focus is on building the API itself.

**Note: Although we need to create a new primary database, we can reuse a shadow database across multiple projects since Prisma resets it after using it.**

1. Create a new database instance in ElephantSQL and create a schema called 'prisma' in it.
2. Rename the `.env.example` file to `.env`
3. Edit the `DATABASE_URL` variable in `.env`, swapping `YOUR_DATABASE_URL` for the URL of the database you just created. Leave `?schema=prisma` at the end.
4. Edit the `SHADOW_DATABASE_URL` variable in `.env`, swapping `YOUR_SHADOW_DATABASE_URL` for the URL of the shadow database you created in the earlier exercises. Leave `?schema=shadow` at the end.
5. If you have not previously done so (e.g. for a past exercise), create another separate **TEST** database instance. Make sure you create a schema called 'prisma' in it.
6. Edit the `TEST_DATABASE_URL` variable in `.env`, swapping `YOUR_TEST_DB_URL` for the URL of the separate **TEST** database instance you just created. Leave `?schema=prisma` at the end.
7. Run `npm ci` to install the project dependencies.
8. Run `npx prisma migrate reset` to execute the existing migrations & data seed. Press `y` when it asks if you're sure.

## Instructions

- Run the app with `npm start`
- Work through each route detailed in the [API Spec](https://boolean-uk.github.io/database-cinema-booking-api/standard).

## Extensions

- Work through each route detailed in the [extended API Spec](https://boolean-uk.github.io/database-cinema-booking-api/extensions). This will require making changes to your existing routes, creating error responses for certain situations, and introducing a new route.
- You will need to create your own tests for these endpoints. Use the existing test provided in `test/api/extensions` as a guide.

## Extensions to the Extensions

- Change your movie list GET route to only respond with movies that have a future screening time
- Add the ability for customers to leave reviews on movies
    - This will require a new entity in your diagram, schema file and seed file. Remember the `npx prisma generate`, `npx prisma migrate dev --create-only --skip-seed --name reviews` and `npx prisma migrate reset` commands from an earlier exercise!
- You will need to create your own tests for these endpoints. Use the existing test provided in `test/api/extensions` as a guide.

## Testing your work

- First, make sure you have created / setup the test database instance and env var, as described in the "Setting Up" section.
- Next, run the command `npm run test:migration` - this will run the schema migrations against the test database.
- Run the test suite with `npm test` for core requirements.
- Run the extension test suite with `npm run test-extensions`.
    - When working on extensions, create your own tests by using the one provided in `test/api/extensions` as a guide.

So far, you may have been using `curl` to manually test your API endpoints. You can continue to use this approach if you choose, or you can download a tool to make things a little easier. There are two main options:

- [Insomnia](https://insomnia.rest/download) (recommended)
- [Postman](https://www.postman.com/)

These tools are quite similar to your web browser but have some additional functionality to make structuring API requests easier.
