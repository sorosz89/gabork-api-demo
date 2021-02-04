const { init } = require("../../../todo/spotify/helper/auth");
const {
    getAnArtistUrl,
    getSeveralArtists,
    getRelatedArtists,
    tracksMarket,
    getTopTracks,
} = require("../../../data/testData/constants.json");

let spotify;
before(async () => {
    spotify = await init();
});

module.exports.getArtist = id => spotify.get(`${getAnArtistUrl}${id}`);

module.exports.getSeveralArtists = async id => {
    const getSeveralArtistsResponse = await spotify.get(`${getSeveralArtists}${id}`);
    // console.debug("getSeveralArtistsResponse:" , getSeveralArtistsResponse)
    return getSeveralArtistsResponse;
};

module.exports.getRelatedArtists = async id => {
    const getRelatedArtistsResponse = await spotify.get(`${getAnArtistUrl}${id}${getRelatedArtists}`);
    // console.debug("getRelatedArtistsResponse:" , getRelatedArtistsResponse)
    return getRelatedArtistsResponse;
};

module.exports.getTopTracks = async (id, market) => {
    const getTopTracksResponse = await spotify.get(`${getAnArtistUrl}${id}${getTopTracks}${tracksMarket}${market}`);
    // console.debug("getTopTracksResponse:" , getTopTracksResponse)
    return getTopTracksResponse;
};
