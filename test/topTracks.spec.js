"use strict";
const { expect } = require("chai");
const { StatusCodes } = require("http-status-codes");
const testData = require("../data/testData/topTracks.json");
const artistsSchema = require("../data/schema/topTracks.json");
const { schemaValidation, randomItem } = require("../todo/spotify/helper/helpers");
const { getTopTracks, unauthGetTopTracks } = require("../todo/spotify/helper/serviceHelper");

describe("Spotify API test - Top Tracks", function outerDesc() {
    this.retries(3);
    describe("Get an Artist's Top Tracks", () => {
        for (const artist of testData) {
            it(`should return the proper status code for : ${artist.artistID}`, async () => {
                const param1 = artist.artistID;
                const param2 = artist.market;
                const response = await getTopTracks(param1, param2);

                expect(response.status).to.be.equal(StatusCodes.OK);
            });
        }

        for (const artist of testData) {
            it(`should return the proper status code for missing market: ${artist.artistID}`, async () => {
                const response = await getTopTracks(artist.artistID)
                    .catch(err => err.response);

                expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
            });
        }

        it("should return a valid response", async () => {
            const selectedArtist = randomItem(testData);
            const param1 = selectedArtist.artistID;
            const param2 = selectedArtist.market;
            const response = await getTopTracks(param1, param2);

            expect(schemaValidation(response.data, artistsSchema)).to.be.true;
        });

        it("should return the Artist's top track", async () => {
            const selectedArtist = randomItem(testData);
            const param1 = selectedArtist.artistID;
            const param2 = selectedArtist.market;
            const response = await getTopTracks(param1, param2);

            const names = response.data.tracks.map(e => e.album.name);
            expect(names).to.include.members(selectedArtist.output.album.name);
        });

        describe("Unauthenticated", () => {
            it("should return the proper status code in case of unauthenticated user", async () => {
                const selectedArtist = randomItem(testData);
                const response = await unauthGetTopTracks(selectedArtist.artistID)
                    .catch(err => err.response);

                const statusCode = StatusCodes[selectedArtist.output.unauthorizedStatus];
                expect(response.status).to.be.equal(statusCode);
            });

            it("should return the proper message in case of unauthenticated user", async () => {
                const selectedArtist = randomItem(testData);
                const response = await unauthGetTopTracks(selectedArtist.artistID)
                    .catch(err => err.response);

                expect(response.data.error.message).to.be.equal(selectedArtist.output.unauthorizedMsg);
            });
        });
    });
});
