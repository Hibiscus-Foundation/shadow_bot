const Discord = require("discord.js");
const mergeImages = require('merge-images');

module.exports.run = async(bot, message, args) => {
    // const users = message.mentions.users.first() || message.author;
    let member = message.mentions.members.first();
    if (!member)
        member = message.member;
    let botembed = new Discord.MessageEmbed()
        .setDescription(member.roles.cache.first().name)
        .setColor(member.displayHexColor)
        .setThumbnail(member.user.displayAvatarURL())
        .addField("User Name", member.displayName);
    return message.channel.send(botembed);
    mergeImages(['/body.png', '/eyes.png', '/mouth.png'])
        .then(b64 => document.querySelector('img').src = b64);
}

module.exports.help = {
    name: "id" //replace with call
}