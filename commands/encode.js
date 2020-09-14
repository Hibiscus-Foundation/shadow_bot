const Discord = require("discord.js");
const agent = require('superagent');

module.exports.run = async (bot, message, args) => {
    mchannel = message.channel;
    let {
        body
    } = await agent.get('http://www.morsecode-api.de/encode?string=' + morseArgs);
    let morseOut = new Discord.MessageEmbed()
        .setTitle("Morse Encoder")
        .setColor("#FF9900")
        .setDescription(body.plaintext + " ➡ " + body.morsecode);
    mchannel.send(morseOut);

}

module.exports.help = {
    name: "encode" //replace with call
}