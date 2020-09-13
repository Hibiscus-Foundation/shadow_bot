const Discord = require("discord.js");
const agent = require('superagent');

module.exports.run = async(bot, message, args) => {
    mchannel = message.channel;
    morseArgs = args.join().replace(/,/g, '%20');
    let {
        body
    } = await agent.get('http://www.morsecode-api.de/decode?string=' + morseArgs);
    let morseOut = new Discord.MessageEmbed()
        .setTitle("Morse Decoder")
        .setColor("#FF9900")
        .setDescription(body.morsecode + " ➡ " + body.plaintext);
    mchannel.send(morseOut);
}

module.exports.help = {
    name: "decode" //replace with call
}