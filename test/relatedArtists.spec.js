"use strict";
const { expect } = require("chai");
const { init } = require("../todo/spotify/helper/auth");
const { StatusCodes } = require("http-status-codes");
const { schemaValidation, randomItem } = require("../todo/spotify/helper/helpers");
const relatedArtistsSchema = require("../data/schema/relatedArtists.json");
const testData = require("../data/testData/relatedArtists.json");
const constants = require("../data/testData/constants.json");

let spotify;
before(async () => {
    spotify = await init();
});

describe("Spotify API test", () => {
    describe("Test of Related Artists API", () => {
        describe("Get an Artist's Related Artists", () => {
            for (const artist of testData) {
                it("should return the proper status code", async () => {
                    // eslint-disable-next-line max-len
                    const response = await spotify.get(`${constants.getAnArtistUrl}${artist.artistID}${constants.getRelatedArtists}`);
                    expect(response.status).to.be.equal(StatusCodes.OK);
                });
            }

            it("should return a valid response", async () => {
                const selectedArtist = randomItem(testData);
                // eslint-disable-next-line max-len
                const response = await spotify.get(`${constants.getAnArtistUrl}${selectedArtist.artistID}${constants.getRelatedArtists}`);
                const responseData = response.data;
                expect(await schemaValidation(responseData, relatedArtistsSchema)).to.be.true;
            });
        });

        it("should return the artists related artists name in the expected order", async () => {
            const selectedArtist = randomItem(testData);
            // eslint-disable-next-line max-len
            const response = await spotify.get(`${constants.getAnArtistUrl}${selectedArtist.artistID}${constants.getRelatedArtists}`);
            // TODO: Go through the whole array
            expect(response.data.artists[1].name).to.be.equal(selectedArtist.output.name[1]);
        });
    });
});

