"use strict";
const { expect } = require("chai");
const { StatusCodes } = require("http-status-codes");
const { schemaValidation, randomItem } = require("../todo/spotify/helper/helpers");
const testData = require("../data/testData/relatedArtists.json");
const invalidTestData = require("../data/testData/relatedArtistsInvalid.json");
const artistsSchema = require("../data/schema/artists.json");
const { getRelatedArtists } = require("../todo/spotify/helper/serviceHelper");

describe("Spotify API test - Related Artists", () => {
    describe("Get an Artist's Related Artists", () => {
        // outline
        for (const artist of testData) {
            it(`should return the proper status code: ${artist.artistID}`, async () => {
                const response = await getRelatedArtists(artist.artistID);
                expect(response.status).to.be.equal(StatusCodes.OK);
            });
        }

        it("should return a valid response", async () => {
            const selectedArtist = randomItem(testData);
            const response = await getRelatedArtists(selectedArtist.artistID);

            const result = response.data.artists.map(artist => schemaValidation(artist, artistsSchema));
            expect(result).to.not.include([false]);
        });

        it("should return the artists related artists name", async () => {
            const selectedArtist = randomItem(testData);
            const response = await getRelatedArtists(selectedArtist.artistID);

            const names = response.data.artists.map(e => e.name);
            expect(names).to.be.eql(selectedArtist.output.name);
        });

        // outline
        for (const artist of invalidTestData) {
            it(`should return the proper error code in case of invalid id: ${artist.artistID}`, async () => {
                const response = await getRelatedArtists(artist.artistID)
                    .catch(err => err.response);
                const statusCode = StatusCodes[artist.output.status];
                expect(response.status).to.be.equal(statusCode);
            });
        }
    });
});
