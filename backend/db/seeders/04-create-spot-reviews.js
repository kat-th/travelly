'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await Review.bulkCreate(
            [
                {
                    spotId: 1,
                    userId: 1,
                    review: 'This one was the BEST one yet. It truly exceeded all of our expectations',
                    stars: 5,
                },
                {
                    spotId: 1,
                    userId: 2,
                    review: 'This is an absolutely beautiful home.',
                    stars: 5,
                },
                {
                    spotId: 1,
                    userId: 3,
                    review: 'Wonderful house in a quiet location',
                    stars: 5,
                },
                {
                    spotId: 2,
                    userId: 1,
                    review: 'I had a wonderful time. Such a great spot',
                    stars: 4,
                },
                {
                    spotId: 2,
                    userId: 3,
                    review: 'Beautiful place and the host was amazing',
                    stars: 5,
                },
                {
                    spotId: 3,
                    userId: 2,
                    review: 'Perfect family getaway',
                    stars: 4,
                },
                {
                    spotId: 3,
                    userId: 1,
                    review: 'This is a lovely spacious place',
                    stars: 5,
                },
            ],
            { validate: true },
        );
    },

    async down(queryInterface, Sequelize) {
        options.tableName = 'Reviews';
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
