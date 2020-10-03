const Discord = require("discord.js");
const mergeImages = require('merge-images');

module.exports.run = async(bot, message, args) => {
    let member = message.mentions.members.first();
    if (!member)
        member = message.member;

    let uicon = mergeImages(['/assets/idbase.png', member.user.displayAvatarURL()]);

    let botembed = new Discord.MessageEmbed()
        .setDescription(member.roles.cache.first().name)
        .setColor(member.displayHexColor)
        .setThumbnail(uicon)
        // .setThumbnail(member.user.displayAvatarURL())
        .addField("User Name", member.displayName);
    return message.channel.send(botembed);
}

module.exports.help = {
    name: "id" //replace with call
}