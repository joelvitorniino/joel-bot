import ytdl from "ytdl-core";
import fs from 'fs';

const download = async (videoID) => {
    let info = await ytdl.getInfo(String(videoID).slice(2).trim());
    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

    const formatAudio = audioFormats.map(x => x.url);

    console.log('Formats with only audio: ' + JSON.stringify(audioFormats[0].url));
};

download('.v https://www.youtube.com/watch?v=V5bOf7wzq8E');