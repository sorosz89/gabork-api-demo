module.exports = {
    baseURL: "https://api.spotify.com/v1",
    tokenEndpointUrl: "https://accounts.spotify.com/api/token",
    getAuthToken() {
        const buff = Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
        );
        return buff.toString("base64");
    },
};
