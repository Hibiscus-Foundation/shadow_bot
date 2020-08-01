const Discord = require("discord.js");
const agent = require('superagent');

module.exports.run = async(bot, message, args) => {
    mchannel = message.channel;
    let {
        body
    } = await agent.get('https://random.dog/woof.json');
    let cupt = new Discord.MessageEmbed()
        .setTitle("Doggo :dog:")
        .setColor("#FF9900")
        .setImage(body.url);

    mchannel.send(cupt);
}

module.exports.help = {
    name: "doggo" //replace with call
}