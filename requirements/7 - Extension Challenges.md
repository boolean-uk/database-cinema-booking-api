# Extensions

- Change your movie list route to only respond with movies that have a future screening time
- Add the ability for customers to leave reviews on movies
    - This will require a new entity in your diagram, schema file and seed file. Remember the `npx prisma generate`, `npx prisma migrate dev --create-only --skip-seed --name reviews` and `npx prisma migrate reset` commands from an earlier exercise!