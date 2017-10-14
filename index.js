'use strict';

const _ = require('lodash');
const request = require('request-promise-native');

const utils = require('./lib/utils');

const OLD_AUTH_TOKEN = process.env.OLD_AUTH_TOKEN;
const NEW_AUTH_TOKEN = process.env.NEW_AUTH_TOKEN;

if(!OLD_AUTH_TOKEN || !NEW_AUTH_TOKEN) {
    console.error('Missing required auth tokens!');
    return process.exit(1);
}

const migration = async () => {
    const songs = [];

    const get_songs = async (uri) => {
        const res = await request({
            method: 'GET',
            uri: uri,
            headers: {
                Authorization: `Bearer ${OLD_AUTH_TOKEN}`
            },
            json: true
        });

        for(const item of res.items) {
            songs.push({
                name: _.get(item, 'track.name'),
                artist: _.get(item, 'track.artists[0].name', ''),
                id: _.get(item, 'track.id')
            });
        }

        if(res.next) {
            await get_songs(res.next);
        }
    }

    // get all saved songs on old account
    await get_songs('https://api.spotify.com/v1/me/tracks?limit=50&market=from_token');

    // reverse song list to add back in original order
    songs.reverse();

    let progress = 1;

    // add songs to new account
    for(const song of songs) {
        utils.clear_print(`Adding: ${progress++}/${songs.length}`);

        await request({
            method: 'PUT',
            uri: `https://api.spotify.com/v1/me/tracks?ids=${song.id}`,
            headers: {
                Authorization: `Bearer ${NEW_AUTH_TOKEN}`
            }
        })
    }

    console.log('\nSong migration completed!');
    return process.exit();
};

try {
    return migration();
} catch(e) {
    console.error(e);
    console.log('Song migration failed!');
    return process.exit(1);
}
