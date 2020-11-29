"use strict";
const { expect } = require("chai");
const { init } = require("../todo/spotify/helper/auth");
const { StatusCodes } = require("http-status-codes");
// const { schemaValidation, randomItem } = require("../todo/spotify/helper/helpers");
// const albumsSchema = require("../data/schema/albums.json");
const testData = require("../data/testData/albumsData.json");
// const getInvalidAlbums = require("../data/testData/albumsDataInvalid.json");
const constants = require("../data/testData/constants.json");

let spotify;
before(async () => {
    spotify = await init();
});

describe("Spotify API test", () => {
    describe("Get an Artist's Albums", () => {
        // outline
        for (const artist of testData) {
            it(`should return the proper status code for: ${artist.artistID}`, async () => {
                const albums = await spotify.get(constants.getAnArtistUrl + artist.artistID);
                expect(albums.status).to.be.equal(StatusCodes.OK);
            });
        }
    });
});
