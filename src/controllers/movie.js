const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const getMovies = async (req, res) => {
  let movies

  if (req.query.runtimeGt || req.query.runtimeLt) {
    const runtimeLt = Number(req.query.runtimeLt)
    const runtimeGt = Number(req.query.runtimeGt)

    console.log(runtimeLt, runtimeGt)

    if (req.query.runtimeGt && req.query.runtimeLt) {
      // console.log('in both query')
      movies = await prisma.movie.findMany({
        where: {
          runtimeMins: {
            lt: runtimeLt,
            gt: runtimeGt
          }
        },
        include: {
          screenings: true
        }
      })
    }
    else if (req.query.runtimeLt) {
      // console.log('in runtimeLt')
      movies = await prisma.movie.findMany({
        where: {
          runtimeMins: {
            lt: runtimeLt
          }
        },
        include: {
          screenings: true
        }
      })
    }
    else if (req.query.runtimeGt) {
      // console.log('in runtimeGt')
      movies = await prisma.movie.findMany({
        where: {
          runtimeMins: {
            gt: runtimeGt
          }
        },
        include: {
          screenings: true
        }
      })
    }
  }
  else {
    // console.log('in no query statement')
    movies = await prisma.movie.findMany({
      include: {
        screenings: true
      }
    })
  }

  // console.log('my movies', movies)
  res.json({ movies })
}

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body

  if (!title || !runtimeMins ) res.status(400).json({ error: "Missing fields in the request body" })

  const movie = await prisma.movie.findFirst({
    where: { title: title }
  })

  if (movie) res.status(409).json({ error: "A movie with the provided title already exist"})
  else {
    let screenings = req.body.screenings

    const adjustedScreenings = screenings.map(screening => {
      
      // console.log('screening before', screening)
      let date = screening.startsAt
      // console.log('my date',date)
      screening.startsAt = new Date(date)
      // console.log(screening)
      return screening
    })

    // console.log(adjustedScreenings)

    const createdMovie = await prisma.movie.create({
      data: !adjustedScreenings ? {
        title,
        runtimeMins
      } : {
        title,
        runtimeMins,
        screenings: {
          create: adjustedScreenings
        }
      },
      include: {
        screenings: true
      }
    })
    
    console.log(createdMovie)

    res.status(201).json({ movie: createdMovie })
  }
}

const getByID = async (req, res) => {
  let param
  let movie
  let whereCondition = {}

  param = Number(req.params.id)

  if (param) {
    whereCondition.id = param
  } else {
    param = req.params.id
    whereCondition.title = param
  }
  // console.log('my condition', whereCondition)

  movie = await prisma.movie.findMany({
    where: whereCondition,
    include: {
      screenings: true
    }
  })

  if(!movie[0]) res.status(404).json({ error: "Movie with that Id or title does not exist" })
  else res.json({ movie })
}

const updateMovie = async (req, res) => {
  const id = Number(req.params.id)
  const { title, runtimeMins } = req.body

  if (!title || !runtimeMins ) res.status(400).json({ error: 'Missing fields in the request body' })
  else {
    const movie = await prisma.movie.update({
      where: {
        id
      },
      data: {
        title,
        runtimeMins
      },
      include: {
        screenings:true
      }
    })

  // const movie = await prisma.movie.update({
  //   where: {
  //     id
  //   },
  //   data: !screenings ? {
  //     title,
  //     runtimeMins
  //   } : {
  //     title,
  //     runtimeMins,
  //     screenings: {
  //       update: {
          
  //       }
  //     }
  //   }
  // })

  // console.log(movie)

    res.status(201).json({
      movie
    })
  }
}

module.exports = {
  getMovies,
  createMovie,
  getByID,
  updateMovie
}