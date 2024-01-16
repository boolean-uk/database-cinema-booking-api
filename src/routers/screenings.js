const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ScreeningDomain {
    async addScreening(movieId, ) {
        try {
            return await prisma.screening.create({
                data: {
                    title,
                    runtimeMins,
                },
            });
        } catch (error) {
            throw error;
        }
    }
}