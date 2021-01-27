/* eslint-disable camelcase */
"use strict";

const axios = require("axios");
const { baseURL, getAuthToken, tokenEndpointUrl } = require("./config");
const { stringify } = require("querystring");

/**
 * Client Credentials Flow
 * Login with your Client ID and Secret Key.
 * The request is sent to the /api/token endpoint of the Accounts service:
 *
 * @returns {Promise.<{access_token, token_type, expires_in}>}
 */
const getAccessToken = async () => {
    try {
        const response = await axios.post(tokenEndpointUrl, stringify({
            "grant_type": "client_credentials",
        }), {
            headers: {
                "Authorization": `Basic ${getAuthToken()}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return response.data;
    } catch (e) {
        if (e.response) {
            throw new Error(
                `Token cannot be set! STATUS: ${e.response.status} : ${JSON.stringify(e.response.data)}`,
            );
        } else {
            throw new Error(`${e.name}: ${e.message}`);
        }
    }
};

/**
 * Use the access token to access the Spotify Web API
 * The access token allows you to make requests to the Spotify Web API endpoints that do not require user authorization.
 *
 * @returns {Promise.<AxiosInstance>}
 */
module.exports.init = async () => {
    const { token_type, access_token } = await getAccessToken();
    if (access_token) {
        console.log("Access Token retireved successfully!");
    }
    return axios.create({
        baseURL,
        headers: {
            "Authorization": `${token_type} ${access_token}`,
        },
    });
};
