const { title, runtimeMins, screenings } = req.body
const { movieId, screenId, startsAt } = screenings[0]

let screeningsToCreate = null

if (screenings) {
  screeningsToCreate = {
    create: {
      screen: {
        connect: {
          id: screenId
        }
      },
      startsAt: startsAt
    }
  }
}

const createdMovie1 = await prisma.movie.create({
  data: {
    title: title,
    runtimeMins: runtimeMins,
    screenings: screeningsToCreate
  },
  include: {
    screenings: true
  }
})

// when we create a movie we also want to create a
// screening based on the request body data which includes movie ID
// and screen ID and startTime
