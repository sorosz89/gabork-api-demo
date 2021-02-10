const { init,unauth} = require("../../../todo/spotify/helper/auth");

const {
    getAnArtistUrl,
    getSeveralArtistsUrl,
    getRelatedArtistsUrl,
    tracksMarketUrl,
    getTopTracksUrl,
} = require("../../../data/testData/constants.json");

let spotify;
let unauthenticated;
before(async () => {
    spotify = await init();
    unauthenticated = await unauth();
});

const getArtist = id => spotify.get(`${getAnArtistUrl}${id}`);

const getSeveralArtists = (...id) => spotify.get(getSeveralArtistsUrl + id);

const getRelatedArtists = id => spotify.get(getAnArtistUrl + id + getRelatedArtistsUrl);

const getTopTracks = (id, market) => spotify.get(getAnArtistUrl + id + getTopTracksUrl + tracksMarketUrl + market);

const unauthGetArtist = id => unauthenticated.get(getAnArtistUrl + id);

const unauthGetSeveralArtists = (...id) => unauthenticated.get(getSeveralArtistsUrl + id);

const unauthGetRelatedArtists = id => unauthenticated.get(getAnArtistUrl + id + getRelatedArtistsUrl);

const unauthGetTopTracks = id => unauthenticated.get(getAnArtistUrl + id + getTopTracksUrl);

module.exports = {
    getArtist,
    getSeveralArtists,
    getRelatedArtists,
    getTopTracks,
    unauthGetArtist,
    unauthGetSeveralArtists,
    unauthGetRelatedArtists,
    unauthGetTopTracks,
};
