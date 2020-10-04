const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('../assets/ytsearch');

module.exports.run = async(bot, message, args) => {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
        return message.reply('please join a voice channel first!');
    }

    voiceChannel.join().then(connection => {
        const uri = await ytSearch(args);
        console.log(uri);
        const stream = ytdl(`https://www.youtube.com/watch?v=${uri}`, {
            filter: 'audioonly'
        });
        const dispatcher = connection.play(stream);
        dispatcher.on('finish', () => voiceChannel.leave());
    });
}

module.exports.help = {
    name: "play" //replace with call
}