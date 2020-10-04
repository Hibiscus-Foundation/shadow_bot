const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytSearch = require('../assets/ytsearch');

module.exports.run = async(bot, message, args) => {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
        return message.reply('please join a voice channel first!');
    }

    const uri = await ytSearch(args.join(' '));

    voiceChannel.join().then(connection => {

        const stream = ytdl(`https://www.youtube.com/watch?v=${uri[0]}`, {
            filter: 'audioonly'
        });
        const dispatcher = connection.play(stream);
        message.channel.send('🎵 Playing now in ' + voiceChannel + '!');
        dispatcher.on('finish', () => voiceChannel.leave());
    });

}

module.exports.help = {
    name: "play" //replace with call
}