const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    try {
        const customer = await createCustomer();
        const movies = await createMovies();
        const screens = await createScreens();
        await createScreenings(screens, movies);
        await createReviews(customer, movies);

        console.log('Seeding completed successfully');
    } catch (e) {
        console.error('Error during seeding:', e);
    } finally {
        await prisma.$disconnect();
        process.exit(0);
    }
}

async function createCustomer() {
    const customer = await prisma.customer.create({
        data: {
            name: 'Alice',
            contact: {
                create: {
                    email: 'alice@boolean.co.uk',
                    phone: '1234567890',
                },
            },
        },
        include: {
            contact: true,
        },
    });

    console.log('Customer created:', customer.name);
    return customer;
}

async function createMovies() {
    const rawMovies = [
        { title: 'The Matrix', runtimeMins: 120 },
        { title: 'Dodgeball', runtimeMins: 154 },
    ];

    const movies = await prisma.movie.createMany({
        data: rawMovies,
    });

    console.log('Movies created:', movies.map(movie => movie.title));
    return movies;
}

async function createScreens() {
    const rawScreens = [{ number: 1 }, { number: 2 }];

    const screens = await prisma.screen.createMany({
        data: rawScreens,
    });

    console.log('Screens created:', screens.map(screen => screen.number));
    return screens;
}

async function createScreenings(screens, movies) {
    const screeningDate = new Date();

    const screenings = [];

    for (const screen of screens) {
        for (let i = 0; i < movies.length; i++) {
            screeningDate.setDate(screeningDate.getDate() + i);

            const screening = await prisma.screening.create({
                data: {
                    startsAt: screeningDate,
                    movieId: movies[i].id,
                    screenId: screen.id,
                },
            });

            console.log('Screening created:', { movie: movies[i].title, screen: screen.number, startsAt: screening.startsAt });
            screenings.push(screening);
        }
    }

    return screenings;
}

async function createReviews(customer, movies) {
    const rawReviews = [
        {
            customerId: customer.id,
            movieId: movies[0].id,
            rating: 5,
            content: 'It was okay',
        },
        {
            customerId: customer.id,
            movieId: movies[1].id,
            rating: 9,
            content: 'I liked this',
        },
    ];

    const reviews = await prisma.review.createMany({
        data: rawReviews,
    });

    console.log('Reviews created for movies:', movies.map(movie => movie.title));
    return reviews;
}

seed();
