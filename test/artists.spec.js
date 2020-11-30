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
            const response = await spotify.get(`${constants.getAnArtistUrl}${selectedArtist.artistID}`);
            expect(schemaValidation(response.data, artistsSchema)).to.be.true;
        });

        it("should return the artist name by id", async () => {
            const selectedArtist = randomItem(testData);
            const response = await spotify.get(`${constants.getAnArtistUrl}${selectedArtist.artistID}`);
            expect(response.data.name).to.be.equal(selectedArtist.output.name);
        });

        // outline
        for (const artist of invalidTestData) {
            it(`should return the proper error code in case of invalid id: ${artist.artistID}`, async () => {
                const response = await spotify
                    .get(`${constants.getAnArtistUrl}${artist.artistID}`)
                    .catch(err => err.response);
                const statusCode = StatusCodes[artist.output.status];
                expect(response.status).to.be.equal(statusCode);
            });
        }

        // outline
        for (const artist of invalidTestData) {
            it(`should return the proper error message in case of invalid id: ${artist.artistID}`, async () => {
                const response = await spotify
                    .get(`${constants.getAnArtistUrl}${artist.artistID}`)
                    .catch(err => err.response);
                expect(response.data.error.message).to.be.equal(artist.output.message);
            });
        }
    });

    describe("Get Multiple Artists", () => {
        it("should return the proper status code for more than one ids", async () => {
            const testDataArray = shuffleArray(testData);
            const response = await spotify
                .get(`${constants.getSeveralArtists}${testDataArray[0].artistID},${testDataArray[1].artistID}`);
            expect(response.status).to.be.equal(StatusCodes.OK);
        });

        it("should return the proper status code for the same id twice", async () => {
            const selectedArtist = randomItem(testData);
            const param = selectedArtist.artistID;
            const response = await spotify.get(`${constants.getSeveralArtists}${param},${param}`);
            expect(response.status).to.be.equal(StatusCodes.OK);
        });

        it("should return the proper status code for three ids", async () => {
            const testDataArray = shuffleArray(testData);
            const param1 = testDataArray[0].artistID;
            const param2 = testDataArray[1].artistID;
            const param3 = testDataArray[2].artistID;
            const response = await spotify.get(`${constants.getSeveralArtists}${param1},${param2},${param3}`);
            expect(response.status).to.be.equal(StatusCodes.OK);
        });

        it("should return the proper status code for one wrong ids", async () => {
            const testDataArray = shuffleArray(testData);
            const param1 = invalidTestData[0].artistID;
            const param2 = testDataArray[1].artistID;
            const param3 = testDataArray[2].artistID;
            const response = await spotify.get(`${constants.getSeveralArtists}${param1},${param2},${param3}`)
                .catch(err => err.response);
            expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
        });

        it("should return the proper status code for three wrong ids", async () => {
            const testDataArray = shuffleArray(invalidTestData);
            const param1 = testDataArray[0].artistID;
            const param2 = testDataArray[1].artistID;
            const param3 = testDataArray[2].artistID;
            const response = await spotify.get(`${constants.getSeveralArtists}${param1},${param2},${param3}`)
                .catch(err => err.response);
            expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
        });
    });
});
