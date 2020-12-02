"use strict";
const { expect } = require("chai");
const { init } = require("../todo/spotify/helper/auth");
const { StatusCodes } = require("http-status-codes");
const testData = require("../data/testData/topTracks.json");
const constants = require("../data/testData/constants.json");
const artistsSchema = require("../data/schema/topTracks.json");
const { schemaValidation, randomItem } = require("../todo/spotify/helper/helpers");

let spotify;
before(async () => {
    spotify = await init();
});

describe("Get an Artist's Top Tracks", () => {
    for (const artist of testData) {
        it(`should return the proper status code for : ${artist.artistID}`, async () => {
            const param1 = artist.artistID;
            const param2 = artist.market;
            const response = await spotify
                .get(`${constants.getAnArtistUrl}${param1}${constants.getTopTracks}${constants.tracksMarket}${param2}`);
            expect(response.status).to.be.equal(StatusCodes.OK);
        });
    }

    for (const artist of testData) {
        it(`should return the proper status code for missing market: ${artist.artistID}`, async () => {
            const response = await spotify
                .get(`${constants.getAnArtistUrl}${artist.artistID}${constants.getTopTracks}`)
                .catch(err => err.response);
            expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
        });
    }

    it("should return a valid response", async () => {
        const selectedArtist = randomItem(testData);
        const param1 = selectedArtist.artistID;
        const param2 = selectedArtist.market;
        const response = await spotify
            .get(`${constants.getAnArtistUrl}${param1}${constants.getTopTracks}${constants.tracksMarket}${param2}`);
        expect(schemaValidation(response.data, artistsSchema)).to.be.true;
    });

    it("should return the Artist's top track", async () => {
        const selectedArtist = randomItem(testData);
        const param1 = selectedArtist.artistID;
        const param2 = selectedArtist.market;
        const response = await spotify
            .get(`${constants.getAnArtistUrl}${param1}${constants.getTopTracks}${constants.tracksMarket}${param2}`);

        const names = response.data.tracks.map(e => e.album.name);
        expect(names).to.include.members(selectedArtist.output.album.name);
    });
});

