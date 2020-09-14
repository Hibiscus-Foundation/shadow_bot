const Discord = require("discord.js");
const agent = require('superagent');

module.exports.run = async (bot, message, args) => {
    mchannel = message.channel;
    let {
        body
    } = await agent.get('https://dog.ceo/api/breeds/image/random');
    if (body.status == "success") {
        let cupt = new Discord.MessageEmbed()
            .setTitle("Doggo :dog:")
            .setColor("#FF9900")
            .setImage(body.message);
        mchannel.send(cupt);
    } else {
        let cupt = new Discord.MessageEmbed()
            .setTitle("Doggo :dog:")
            .setColor("#FF9900")
            .setDescription("My doggo fren got lost! Can you use the command again! THANKS");
        mchannel.send(cupt);
    }

}

module.exports.help = {
    name: "dog" //replace with call
}