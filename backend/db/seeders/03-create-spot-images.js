'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await SpotImage.bulkCreate(
            [
                {
                    spotId: 1,
                    url: 'https://travelly-images.s3.us-east-2.amazonaws.com/spot1-01.png',
                    preview: true,
                },
                {
                    spotId: 1,
                    url: 'https://travelly-images.s3.us-east-2.amazonaws.com/spot1-02.png',
                    preview: false,
                },
                {
                    spotId: 1,
                    url: 'https://travelly-images.s3.us-east-2.amazonaws.com/spot1-03.png',
                    preview: false,
                },
                {
                    spotId: 1,
                    url: 'https://travelly-images.s3.us-east-2.amazonaws.com/spot1-04.png',
                    preview: false,
                },
                {
                    spotId: 1,
                    url: 'https://travelly-images.s3.us-east-2.amazonaws.com/spot1-05.png',
                    preview: false,
                },
                {
                    spotId: 2,
                    url: 'https://travelly-images.s3.us-east-2.amazonaws.com/spot2-01.png',
                    preview: true,
                },
                {
                    spotId: 2,
                    url: 'https://travelly-images.s3.us-east-2.amazonaws.com/spot2-02.png',
                    preview: false,
                },
                {
                    spotId: 2,
                    url: 'https://travelly-images.s3.us-east-2.amazonaws.com/spot2-03.png',
                    preview: false,
                },
                {
                    spotId: 2,
                    url: 'https://travelly-images.s3.us-east-2.amazonaws.com/spot2-04.png',
                    preview: false,
                },
                {
                    spotId: 2,
                    url: 'https://travelly-images.s3.us-east-2.amazonaws.com/spot2-05.png',
                    preview: false,
                },
                {
                    spotId: 3,
                    url: 'https://travelly-images.s3.us-east-2.amazonaws.com/spot3-01.png',
                    preview: true,
                },
                {
                    spotId: 3,
                    url: 'https://travelly-images.s3.us-east-2.amazonaws.com/spot3-02.png',
                    preview: false,
                },
                {
                    spotId: 3,
                    url: 'https://travelly-images.s3.us-east-2.amazonaws.com/spot3-03.png',
                    preview: false,
                },
                {
                    spotId: 3,
                    url: 'https://travelly-images.s3.us-east-2.amazonaws.com/spot3-04.png',
                    preview: false,
                },
                {
                    spotId: 3,
                    url: 'https://travelly-images.s3.us-east-2.amazonaws.com/spot3-05.png',
                    preview: false,
                },
            ],
            { validate: true },
        );
    },

    async down(queryInterface, Sequelize) {
        options.tableName = 'SpotImages';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            options,
            {
                spotId: { [Op.in]: [1, 2, 3] },
            },
            {},
        );
    },
};
