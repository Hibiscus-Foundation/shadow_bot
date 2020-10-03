const Discord = require("discord.js");
import mergeImages from 'merge-images';

module.exports.run = async(bot, message, args) => {
    let bicon = message.user.displayAvatarURL();
    let botembed = new Discord.MessageEmbed()
        .setDescription("Bot Information")
        .setColor("#00FFFF")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Created on", bot.user.createdAt);
    return message.channel.send(botembed);
    mergeImages(['/body.png', '/eyes.png', '/mouth.png'])
        .then(b64 => document.querySelector('img').src = b64);
}

module.exports.help = {
    name: "id" //replace with call
}