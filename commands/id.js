const Discord = require("discord.js");
const Canvas = require('canvas');

const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');
    let fontSize = 35;

    do {
        ctx.font = `${fontSize -= 10}px sans-serif`;
    } while (ctx.measureText(text).width > canvas.width - 225);
    return ctx.font;
};

module.exports.run = async(bot, message, args) => {
    let member = message.mentions.members.first();
    if (!member)
        member = message.member;
    const canvas = Canvas.createCanvas(700, 350);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./assets/idbase.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = member.displayHexColor;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = applyText(canvas, member.roles.cache.first().name);
    ctx.fillStyle = '#111111';
    ctx.fillText(member.roles.cache.first().name, 250, 230);

    ctx.font = applyText(canvas, member.displayName);
    ctx.fillStyle = '#111111';
    ctx.fillText(member.displayName, 250, 285);


    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({
        format: 'jpg'
    }));

    ctx.drawImage(avatar, 35, 177, 150, 150);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'id-image.png');

    return message.channel.send(attachment);
}

module.exports.help = {
    name: "id" //replace with call
}