const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma');
const { query } = require("express");

const getAllMovies = async (req, res) => {
    const result = await prisma.movie.findMany({
        select: {
            id: true,
            title: true,
            runtimeMins: true,
            createdAt: true,
            updatedAt: true,
            screenings: true
        }
    });
    res.status(200).send({movies: result})
}

const getMovieById = async (req, res) => {
    const id = Number(req.params.id)
    const result = await prisma.movie.findUnique({
        where: {
            id
        },
        include: {
            screenings: true
        }
    })
    res.send({movie: result})
}

const createMovie = async (req, res) => {
    const {title, runtimeMins} = req.body
    const result =  await prisma.movie.create({
        data: {
            title,
            runtimeMins
        },
        include: {
            screenings: true
        }
    })
    res.status(201).send({movie: result})
}

const updateMovie = async (req, res) => {
    const id = Number(req.params.id)
    const {title, runtimeMins} = req.body
    const result = await prisma.movie.update({
        where: {
            id
        },
        data: {
            title,
            runtimeMins
        },
        include: {
            screenings: true
        }
    })
    res.status(201).send({movie: result})
}

module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovie
}