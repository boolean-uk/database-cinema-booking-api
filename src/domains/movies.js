const { detectRuntime } = require('@prisma/client/runtime/library')
const prisma = require('../utils/prisma')

// getting the list of movies
const getMovieListDb= async () => await prisma.movie.findMany ({include:{screenings: true}
})
const getMovieListGtLtDb = async () => await prisma.movie.findMany ({
    where:{
    OR: [
        {
            runtimeMins: {gt: runtimeGt}
        },
        {
            runtimeMins: {lt: runtimeLt}
        }
    ]
    },
    include : {screenings: true}
})

const getMovieListGtDb = async () => await prisma.movie.findMany ({
    where :{
        runtimeMins : {lt: runtimeLt}
    },
    include: {screenings: true}
})

// Create a movie 

const createMovieDb = async (title, runtimeMins) => await prisma.movie.create({
    data: {title,runtimeMins},
    include: {screenings: true}
})

const createMovieAndScreeningDb = async (title, runtimeMins, screenings) => await prisma.movie.create({
    data: {title, runtimeMins, screenings:{create: screenings}},
    include: {screenings: true}
})

// getting a movie by title

const getMovieByTitleDb = async (title) => await prisma.movie.findFirst ({
    where: {title}
}) 

// getting a movie by Id

const getMovieByIdDb = async (id) => await prisma.movie.findUnique({
    where: {id}, 
    include: {screenings: true}  
})

//updating a movie by Id

const updateMovieDb = async (id, title, runtimeMins) => await prisma.movie.update({
    where: {id},
    data: {title, runtimeMins},
    include: {screenings: true}
})

module.exports = {getMovieListDb, createMovieDb, getMovieByIdDb, updateMovieDb, getMovieListGtLtDb, 
    getMovieListGtDb, getMovieListDb, createMovieAndScreeningDb, getMovieByTitleDb }