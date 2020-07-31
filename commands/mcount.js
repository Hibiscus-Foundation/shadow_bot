const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let memembed = new Discord.MessageEmbed()
        .setDescription("Member Count")
        .addField("Current members", message.guild.memberCount);
    return message.channel.send(memembed);
}

module.exports.help = {
    name: "mcount"
}