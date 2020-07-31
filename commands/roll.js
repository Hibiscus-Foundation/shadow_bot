const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let diceRoll = Math.floor((Math.random() * 10) + 1);
    let dicon = "https://i.imgur.com/kzm46fB.png"


    let dembed = new Discord.MessageEmbed()
        .setDescription("You roll the dice")
        .setColor("#FFBF00")
        .setThumbnail(dicon)
        .addField("You roll", diceRoll)

    return message.channel.send(dembed);
}

module.exports.help = {
    name: "roll" //replace with call
}