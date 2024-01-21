const prisma = require("../utils/prisma");

const fetchAllDisplaysDb = async () => await prisma.display.findMany();

const establishDisplayDb = async (requestPayload) => {
  const { displayNum, projectionsInfo } = requestPayload;

  const dataToEstablish = {};

  if (displayNum) {
    dataToEstablish.displayNum = displayNum;
  }

  if (projectionsInfo) {
    dataToEstablish.projectionsInfo = {
      create: {
        movieId: projectionsInfo.movieId,
        displayId: projectionsInfo.displayId,
        startTime: projectionsInfo.startTime,
      },
    };
  }

  const createdDisplay = await prisma.display.create({
    data: dataToEstablish,
    include: {
      projectionsInfo: true,
    },
  });

  return createdDisplay;
};

module.exports = {
  fetchAllDisplaysDb,
  establishDisplayDb,
};
