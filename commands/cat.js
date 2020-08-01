const Discord = require("discord.js");
const agent = require('superagent');

module.exports.run = async(bot, message, args) => {
    mchannel = message.channel;
    let {
        body
    } = await agent.get('https://random.cat/meow');
    let cupt = new Discord.MessageEmbed()
        .setTitle("Cat :cat:")
        .setColor("#FF9900")
        .setImage(body.file);

    mchannel.send(cupt);
}

module.exports.help = {
    name: "cat" //replace with call
}