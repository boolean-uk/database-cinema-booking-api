# Cinema Booking API

> API stands for Application Programming Interface, which is a set of definitions and protocols for building and integrating software. Simply put, they allow two pieces of software to communicate with each other through a pre-defined interface.

## Learning Objectives

- Design and build a database-backed API
- Use a specification to provide consistent JSON response structures

## Introduction

So far, we've designed a database structure for a cinema booking system and implemented that design using an ORM. The next step is to build a system that allows the cinema and its customers to interact with the database.

Frontend applications usually won't interact with a database directly, especially if it's a web app; they'll instead send instructions to a server which will process those instructions and give back a response. We decide how the server receives instructions, processes them and responds back by creating an API.

## Setting up

The full database schema and seed file for this exercise has already been implemented, your focus is on building the API itself.

**Note: Although we need to create a new primary database, we can reuse a shadow database across multiple projects since Prisma resets it after using it.**

1. Create a new database instance in ElephantSQL.
2. Rename the `.env.example` file to `.env`
3. Edit the `DATABASE_URL` variable in `.env`, swapping `YOUR_DATABASE_URL` for the URL of the database you just created. Leave `?schema=prisma` at the end.
4. Edit the `SHADOW_DATABASE_URL` variable in `.env`, swapping `YOUR_SHADOW_DATABASE_URL` for the URL of the shadow database you created in the earlier exercises. Leave `?schema=public` at the end.
5. Run `npm ci` to install the project dependencies.
6. Run `npx prisma migrate reset` to execute the existing migration & data seed. Press `y` when it asks if you're sure.

## Instructions

- Work through each file in the `requirements` directory in numerical order

## Testing your work

So far, you may have been using `curl` to test your API endpoints. You can continue to use this approach if you choose, or you can download a tool to make things a little easier. There are two main options:

- [Insomnia](https://insomnia.rest/) (recommended)
- [Postman](https://www.postman.com/)

These tools are quite similar to your web browser but have some additional functionality to make structuring API requests easier.