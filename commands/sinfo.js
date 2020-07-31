const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.MessageEmbed()
        .setDescription("Server Information")
        .setColor("#00FFFF")
        .setThumbnail(sicon)
        .addField("Name", message.guild.name)
        .addField("Created on", message.guild.createdAt)
        .addField("Total members", message.guild.memberCount)
        .addField("You joined the nest on", message.member.joinedAt);
    return message.channel.send(serverembed);
    e
}

module.exports.help = {
    name: "sinfo" //replace with call
}