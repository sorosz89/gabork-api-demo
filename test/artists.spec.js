"use strict";
const { expect } = require("chai");
const { init } = require("../todo/spotify/helper/auth");
const { StatusCodes } = require("http-status-codes");
const { schemaValidation, randomItem, shuffleArray } = require("../todo/spotify/helper/helpers");
const artistsSchema = require("../data/schema/artists.json");
const testData = require("../data/testData/artistsData.json");
const invalidTestData = require("../data/testData/artistsDataInvalid.json");
const constants = require("../data/testData/constants.json");

let spotify;
before(async () => {
    spotify = await init();
});

describe("Spotify API test", () => {
    describe("Get an Artist", () => {
        // outline
        for (const artist of testData) {
            it(`should return the proper status code for : ${artist.artistID}`, async () => {
                const response = await spotify.get(`${constants.getAnArtistUrl}${artist.artistID}`);
                expect(response.status).to.be.equal(StatusCodes.OK);
            });
        }

        it("should return a valid response", async () => {
            const selectedArtist = randomItem(testData);
            const response = await spotify.get(constants.getAnArtistUrl + selectedArtist.artistID);
            const responseData = response.data;
            expect(await schemaValidation(responseData, artistsSchema)).to.be.true;
        });

        it("should return the artist name by id", async () => {
            const selectedArtist = randomItem(testData);
            const response = await spotify.get(constants.getAnArtistUrl + selectedArtist.artistID);
            expect(response.data.name).to.be.equal(selectedArtist.output.name);
        });

        // outline
        for (const artist of invalidTestData) {
            it(`should return the proper error code in case of invalid id: " ${artist.artistID}`, async () => {
                const response = await spotify
                    .get(constants.getAnArtistUrl + artist.artistID)
                    .catch(err => err.response);
                const statusCode = StatusCodes[artist.output.status];
                expect(response.status).to.be.equal(statusCode);
            });
        }

        // outline
        for (const artist of invalidTestData) {
            it(`should return the proper error message in case of invalid id: ${artist.artistID}`, async () => {
                const response = await spotify
                    .get(constants.getAnArtistUrl + artist.artistID)
                    .catch(err => err.response);
                expect(response.data.error.message).to.be.equal(artist.output.message);
            });
        }
    });

    describe("Get Multiple Artists", () => {
        it("should return the proper status code for more than one ids", async () => {
            const testDataArray = shuffleArray(testData);
            const artist = await spotify
                .get(`${constants.getSeveralArtists}${testDataArray[0].artistID},${testDataArray[1].artistID}`);
            expect(artist.status).to.be.equal(StatusCodes.OK);
        });

        it("should return the proper status code for the same id twice", async () => {
            const selectedArtist = randomItem(testData);
            // eslint-disable-next-line max-len
            const artist = await spotify.get(`${constants.getSeveralArtists}${selectedArtist.artistID},${selectedArtist.artistID}`);
            expect(artist.status).to.be.equal(StatusCodes.OK);
        });

        it("should return the proper status code for three ids", async () => {
            const testDataArray = shuffleArray(testData);
            // eslint-disable-next-line max-len
            const artist = await spotify.get(`${constants.getSeveralArtists}${testDataArray[0].artistID},${testDataArray[1].artistID},${testDataArray[2].artistID}`);
            expect(artist.status).to.be.equal(StatusCodes.OK);
        });
    });
});
