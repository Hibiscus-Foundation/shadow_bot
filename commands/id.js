const Discord = require("discord.js");
const Canvas = require('canvas');

module.exports.run = async(bot, message, args) => {
    let member = message.mentions.members.first();
    if (!member)
        member = message.member;
    const canvas = Canvas.createCanvas(700, 350);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./assets/idbase.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({
        format: 'jpg'
    }));

    ctx.drawImage(avatar, 30, 150, 140, 140);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'id-image.png');

    return message.channel.send(attachment);
}

module.exports.help = {
    name: "id" //replace with call
}