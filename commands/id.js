const Discord = require("discord.js");
const Canvas = require('canvas');

module.exports.run = async(bot, message, args) => {
    let member = message.mentions.members.first();
    if (!member)
        member = message.member;
    const canvas = Canvas.createCanvas(324, 163);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./idbase.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(81.5, 81.5, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({
        format: 'jpg'
    }));

    ctx.drawImage(avatar, 13, 13, 150, 150);

    let botembed = new Discord.MessageEmbed()
        .setDescription(member.roles.cache.first().name)
        .setColor(member.displayHexColor)
        .setThumbnail(canvas.toBuffer(), 'welcome-image.png')
        // .setThumbnail(member.user.displayAvatarURL())
        .addField("User Name", member.displayName);
    return message.channel.send(botembed);
}

module.exports.help = {
    name: "id" //replace with call
}