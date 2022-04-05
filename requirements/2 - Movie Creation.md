# Movie Creation

- Build a route to create a new movie
- **EXT** Include the ability to create screenings for the movie if the request body has a `screenings` property
    - [Create Related Records](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-writes)
- **EXT** Send back an error message if a movie with the same name already exists in the database
