'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await Spot.bulkCreate(
            [
                {
                    ownerId: 1,
                    address: '123 Pencil Ln',
                    city: 'New York City',
                    state: 'New York',
                    country: 'United States',
                    lat: 40.7128,
                    lng: -74.006,
                    name: 'Luxury Modern Rustic Home at Lake',
                    description:
                        "Nestled across the street from the scenic Baxter Lake, Camelot Chalet is a stunning 4-bedroom home, built in 2022, that comfortably accommodates 12-14 guests. Whether you're planning a relaxing summer getaway filled with days on the lake and outdoor adventures or a cozy winter escape to enjoy snowy landscapes and fireside evenings, this retreat provides the perfect setting for your seasonal vacation.",
                    price: 100,
                },
                {
                    ownerId: 2,
                    address: '371 Main St',
                    city: 'Los Angeles',
                    state: 'California',
                    country: 'United States',
                    lat: 34.0522,
                    lng: -118.2437,
                    name: 'Romantic A-Frame cabin in the woods',
                    description:
                        'Modern cabin tucked privately in the forest. Loaded with modern amenities make it perfect for a romantic getaway. Unwind in the hot tub looking up at the sky full of stars. Take a Sauna while being surrounded by nature all around. Relax by the fire pit. Located in the majestic forest of mount agamenticus, the extensive trail system is off our road. Short drive to the Ogunquit/ york beaches, outlets at Kittery and near Portsmouth, Dover and Portland restaurant scenes.',
                    price: 130,
                },
                {
                    ownerId: 3,
                    address: '1293 West Ave',
                    city: 'Chicago',
                    state: 'Illinois',
                    country: 'United States',
                    lat: 10.7128,
                    lng: -60.006,
                    name: 'The Lodge on Warner Hill',
                    description:
                        'On your journey to our lodge, you will pass through a nostalgic covered bridge, drive by a babbling brook, and meander up a winding dead-end dirt road. Our home sits in a quiet, peaceful 5-acre setting. It has been completely remodeled with earth-tone charm. Enjoy your time with friends and family relaxing, reading a book, playing pool, barbequing on the back deck, gazing at the stars, or hanging out by the fire pit. Located less than 10 minutes from Berkshire East and the Deerfield River',
                    price: 200,
                },
            ],
            { validate: true },
        );
    },

    async down(queryInterface, Sequelize) {
        options.tableName = 'Spots';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            options,
            {
                name: { [Op.in]: ['Spot 1', 'Spot 2', 'Spot 3'] },
            },
            {},
        );
    },
};
