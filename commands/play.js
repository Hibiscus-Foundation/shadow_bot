const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
        return message.reply('please join a voice channel first!');
    }

    voiceChannel.join().then(connection => {
        const stream = ytdl('https://www.youtube.com/watch?v=D57Y1PruTlw', {
            filter: 'audioonly'
        });
        const dispatcher = connection.play(stream);

        dispatcher.on('finish', () => voiceChannel.leave());
    });
}

module.exports.help = {
    name: "play" //replace with call
}