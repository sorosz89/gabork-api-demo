"use strict";
const { expect } = require("chai");
const { init } = require("../todo/spotify/helper/auth");
const { StatusCodes } = require("http-status-codes");
const testData = require("../data/testData/topTracks.json");
const constants = require("../data/testData/constants.json");
const artistsSchema = require("../data/schema/topTracks.json");
const { schemaValidation, randomItem } = require("../todo/spotify/helper/helpers");
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

    it("should return a valid response", async () => {
        const selectedArtist = randomItem(testData);
        // eslint-disable-next-line max-len
        const response = await spotify.get(`${constants.getAnArtistUrl}${selectedArtist.artistID}${constants.getTopTracks}${constants.getTopTracksMarket}${selectedArtist.market}`);
        const responseData = response.data;
        expect(await schemaValidation(responseData, artistsSchema)).to.be.true;
    });

    it("should return the Artist's top track", async () => {
        const selectedArtist = randomItem(testData);
        // eslint-disable-next-line max-len
        const response = await spotify.get(`${constants.getAnArtistUrl}${selectedArtist.artistID}${constants.getTopTracks}${constants.getTopTracksMarket}${selectedArtist.market}`);
        expect(response.data.tracks[0].album.name).to.be.equal(selectedArtist.output.album.name[0]);
        expect(response.status).to.be.equal(StatusCodes.OK);
    });
});

