const { getMoviesDb, getMoviesWhereAndDb, getMoviesWhereOrDb, getMoviesWhereLtDb, getMoviesWhereGtDb } = require("../domains/movie");

const getMovies = async (req, res) => {
    let movies
    const { runtimeLt, runtimeGt} = req.query
    if (runtimeLt && runtimeGt) {
        const runtimeLtNum = Number(runtimeLt)
        const runtimeGtNum = Number(runtimeGt)
        movies = await (getMoviesWhereAndDb(runtimeLtNum, runtimeGtNum))
    }
    
    if (runtimeLt) {
        const runtimeLtNum = Number(runtimeLt)
        movies = await (getMoviesWhereLtDb(runtimeLtNum))
    }
    
    if (runtimeGt) {
        const runtimeGtNum = Number(runtimeGt)
        movies = await (getMoviesWhereGtDb(runtimeGtNum))
    }
    
    if (!runtimeLt && !runtimeGt) {
        movies = await getMoviesDb()
    }
    return res.json({ movies: movies })
    
}

module.exports = {
    getMovies
}