const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const customers = await createCustomer();
  const movies = await createMovies();
  const screens = await createScreens();
  await createScreenings(screens, movies);
  await createReviews(customers, movies)

  process.exit(0);
}

async function createCustomer() {
  const customers = [];

  const customer1 = await prisma.customer.create({
    data: {
      name: 'Alice',
      contact: {
        create: {
          email: 'alice@boolean.co.uk',
          phone: '1234567890'
        }
      }
    },
    include: {
      contact: true
    }
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: 'John',
      contact: {
        create: {
          email: 'john@boolean.co.uk',
          phone: '1233687890'
        }
      }
    },
    include: {
      contact: true
    }
  });

  const rawCustomers = [
    customer1,
    customer2
  ]

  for (const rawCustomer of rawCustomers) {
    customers.push(rawCustomer);
  }

  console.log('Customer created', customers);

  return customers;
}

async function createMovies() {
  const rawMovies = [
    { title: 'The Matrix', runtimeMins: 120 },
    { title: 'Dodgeball', runtimeMins: 154 },
  ];

  const movies = [];

  for (const rawMovie of rawMovies) {
    const movie = await prisma.movie.create({ data: rawMovie });
    movies.push(movie);
  }

  console.log('Movies created', movies);

  return movies;
}

async function createScreens() {
  const rawScreens = [
    { number: 1 }, { number: 2 }
  ];

  const screens = [];

  for (const rawScreen of rawScreens) {
    const screen = await prisma.screen.create({
      data: rawScreen
    });

    console.log('Screen created', screen);

    screens.push(screen);
  }

  return screens;
}

async function createScreenings(screens, movies) {
  const screeningDate = new Date();

  for (const screen of screens) {
    for (let i = 0; i < movies.length; i++) {
      screeningDate.setDate(screeningDate.getDate() + i);

      const screening = await prisma.screening.create({
        data: {
          startsAt: screeningDate,
          movie: {
            connect: {
              id: movies[i].id
            }
          },
          screen: {
            connect: {
              id: screen.id
            }
          }
        }
      });

      console.log('Screening created', screening);
    }
  }
}

async function createReviews(customers, movies) {
  for (const customer of customers) {
    for (let i = 0; i < movies.length; i++) {

      const review = await prisma.review.create({
        data: {
          content: "best movie ever",
          movie: {
            connect: {
              id: movies[i].id
            }
          },
          customer: {
            connect: {
              id: customer.id
            }
          }
        }
      });

      console.log('Review created', review);
    }
  }
}

seed()
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));
