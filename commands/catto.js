const Discord = require("discord.js");
const agent = require('superagent');

module.exports.run = async (bot, message, args) => {
    mchannel = message.channel;
    let {
        body
    } = await agent.get('https://api.thecatapi.com/v1/images/search');
    let cupt = new Discord.MessageEmbed()
        .setTitle("Cat :cat:")
        .setColor("#FF9900")
        .setImage(body[0].url);

    mchannel.send(cupt);
}

module.exports.help = {
    name: "cat" //replace with call
}