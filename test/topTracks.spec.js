"use strict";
const { expect } = require("chai");
const { init } = require("../todo/spotify/helper/auth");
const { StatusCodes } = require("http-status-codes");
const testData = require("../data/testData/topTracks.json");
const constants = require("../data/testData/constants.json");
// eslint-disable-next-line no-loop-func
let spotify;
before(async () => {
    spotify = await init();
});

describe("Get an Artist's Top Tracks", () => {
    for (const artist of testData) {
        it(`should return the proper status code for : ${artist.artistID}`, async () => {
            // eslint-disable-next-line max-len
            const response = await spotify.get(`${constants.getAnArtistUrl}${artist.artistID}${constants.getTopTracks}${constants.getTopTracksMarket}${artist.market}`);
            expect(response.status).to.be.equal(StatusCodes.OK);
        });
    }

    for (const artist of testData) {
        it(`should return the proper status code for missing market: ${artist.artistID}`, async () => {
            const response = await spotify.get(`${constants.getAnArtistUrl}${artist.artistID}${constants.getTopTracks}`)
                .catch(err => err.response);
            expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
        });
    }
});
