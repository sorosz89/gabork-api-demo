"use strict";
const { expect } = require("chai");
const { StatusCodes } = require("http-status-codes");
const { schemaValidation, randomItem, shuffleArray } = require("../todo/spotify/helper/helpers");
const artistsSchema = require("../data/schema/artists.json");
const testData = require("../data/testData/artistsData.json");
const invalidTestData = require("../data/testData/artistsDataInvalid.json");
const {
    getArtist,
    getSeveralArtists,
    unauthGetArtist,
    unauthGetSeveralArtists,
} = require("../todo/spotify/helper/serviceHelper");

describe("Spotify API test - Artist", () => {
    describe("Get an Artist", () => {
        // outline
        for (const artist of testData) {
            it(`should return the proper status code for : ${artist.artistID}`, async () => {
                const response = await getArtist(artist.artistID);
                expect(response.status).to.be.equal(StatusCodes.OK);
            });
        }

        it("should return a valid response", async () => {
            const selectedArtist = randomItem(testData);
            const response = await getArtist(selectedArtist.artistID);
            expect(schemaValidation(response.data, artistsSchema)).to.be.true;
        });

        it("should return the artist name by id", async () => {
            const selectedArtist = randomItem(testData);
            const response = await getArtist(selectedArtist.artistID);
            expect(response.data.name).to.be.equal(selectedArtist.output.name);
        });

        // outline
        for (const artist of invalidTestData) {
            it(`should return the proper error code in case of invalid id: ${artist.artistID}`, async () => {
                const response = await getArtist(artist.artistID)
                    .catch(err => err.response);
                const statusCode = StatusCodes[artist.output.status];
                expect(response.status).to.be.equal(statusCode);
            });
        }

        // outline
        for (const artist of invalidTestData) {
            it(`should return the proper error message in case of invalid id: ${artist.artistID}`, async () => {
                const response = await getArtist(artist.artistID)
                    .catch(err => err.response);
                expect(response.data.error.message).to.be.equal(artist.output.message);
            });
        }

        describe("Unauthenticated", () => {
            it("should return the proper status code in case of unauthenticated user", async () => {
                const selectedArtist = randomItem(testData);
                const response = await unauthGetArtist(selectedArtist.artistID)
                    .catch(err => err.response);
                const statusCode = StatusCodes[selectedArtist.output];
                expect(response.data.status).to.be.equal(statusCode);
            });

            it("should return the proper message in case of unauthenticated user", async () => {
                const selectedArtist = randomItem(testData);
                const response = await unauthGetArtist(selectedArtist.artistID)
                    .catch(err => err.response);
                expect(response.data.error.message).to.be.equal(selectedArtist.output.unauthorizedMsg);
            });
        });
    });

    describe("Get Multiple Artists", () => {
        it("should return the proper status code for more than one ids", async () => {
            const testDataArray = shuffleArray(testData);
            const response = await getSeveralArtists(
                testDataArray[0].artistID,
                testDataArray[1].artistID,
            );
            expect(response.status).to.be.equal(StatusCodes.OK);
        });

        it("should return the proper status code for the same id twice", async () => {
            const selectedArtist = randomItem(testData);
            const response = await getSeveralArtists(
                selectedArtist.artistID,
                selectedArtist.artistID,
            );
            expect(response.status).to.be.equal(StatusCodes.OK);
        });

        it("should return the proper status code for three ids", async () => {
            const testDataArray = shuffleArray(testData);
            const response = await getSeveralArtists(
                testDataArray[0].artistID,
                testDataArray[1].artistID,
                testDataArray[2].artistID,
            );
            expect(response.status).to.be.equal(StatusCodes.OK);
        });

        it("should return the proper the proper artist name in case of three valid id", async () => {
            const testDataArray = shuffleArray(testData);
            const response = await getSeveralArtists(
                testDataArray[0].artistID,
                testDataArray[1].artistID,
                testDataArray[2].artistID,
            );
            const responseNames = response.data.artists.map(e => e.name);
            const testDataNames = testDataArray.map(e => e.output.name);
            expect(responseNames).to.be.eql(testDataNames);
        });

        it("should return the proper status code for one wrong ids", async () => {
            const testDataArray = shuffleArray(testData);
            const invTestDataArray = shuffleArray(invalidTestData);

            const response = await getSeveralArtists(
                invTestDataArray[0].artistID,
                testDataArray[1].artistID,
                testDataArray[2].artistID,
            )
                .catch(err => err.response);

            expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
        });

        it("should return the proper status code for three wrong ids", async () => {
            const testDataArray = shuffleArray(invalidTestData);
            const response = await getSeveralArtists(
                testDataArray[0].artistID,
                testDataArray[1].artistID,
                testDataArray[2].artistID,
            )
                .catch(err => err.response);
            expect(response.status).to.be.equal(StatusCodes.BAD_REQUEST);
        });

        describe("Unauthenticated", () => {
            it("should return the proper status code in case of unauthenticated user", async () => {
                const testDataArray = shuffleArray(testData);
                const response = await unauthGetSeveralArtists(
                    testDataArray[0].artistID,
                    testDataArray[1].artistID,
                    testDataArray[2].artistID,
                )
                    .catch(err => err.response);

                const statusCode = StatusCodes[testDataArray[0].output.unauthorizedStatus];
                expect(response.status).to.be.equal(statusCode);
            });

            it("should return the proper message in case of unauthenticated user", async () => {
                const testDataArray = shuffleArray(testData);
                const response = await unauthGetSeveralArtists(
                    testDataArray[0].artistID,
                    testDataArray[1].artistID,
                    testDataArray[2].artistID,
                )
                    .catch(err => err.response);
                expect(response.data.error.message).to.be.equal(testDataArray[0].output.unauthorizedMsg);
            });
        });
    });
});
