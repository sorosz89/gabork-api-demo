"use strict";
const { expect } = require("chai");
const { init } = require("../todo/spotify/helper/auth");
const { StatusCodes } = require("http-status-codes");
const { schemaValidation, randomItem } = require("../todo/spotify/helper/helpers");
const testData = require("../data/testData/relatedArtists.json");
const constants = require("../data/testData/constants.json");
const invalidTestData = require("../data/testData/relatedArtistsInvalid.json");
const artistsSchema = require("../data/schema/artists.json");

let spotify;
before(async () => {
    spotify = await init();
});

describe("Spotify API test", () => {
    describe("Get an Artist's Related Artists", () => {
        // outline
        for (const artist of testData) {
            it(`should return the proper status code: ${artist.artistID}`, async () => {
                const response = await spotify
                    .get(`${constants.getAnArtistUrl}${artist.artistID}${constants.getRelatedArtists}`);
                expect(response.status).to.be.equal(StatusCodes.OK);
            });
        }

        it("should return a valid response", async () => {
            const selectedArtist = randomItem(testData);
            const response = await spotify
                .get(`${constants.getAnArtistUrl}${selectedArtist.artistID}${constants.getRelatedArtists}`);
            const result = response.data.artists.map(artist => schemaValidation(artist, artistsSchema));
            expect(result).to.not.include([false]);
        });

        it("should return the artists related artists name in the expected order", async () => {
            const selectedArtist = randomItem(testData);
            const response = await spotify
                .get(`${constants.getAnArtistUrl}${selectedArtist.artistID}${constants.getRelatedArtists}`);

            const names = response.data.artists.map(e => e.name);
            expect(names).to.be.eql(selectedArtist.output.name);
        });

        // outline
        for (const artist of invalidTestData) {
            it(`should return the proper error code in case of invalid id: ${artist.artistID}`, async () => {
                const response = await spotify
                    .get(`${constants.getAnArtistUrl}${artist.artistID}${constants.getRelatedArtists}`)
                    .catch(err => err.response);
                const statusCode = StatusCodes[artist.output.status];
                expect(response.status).to.be.equal(statusCode);
            });
        }
    });
});
