const Discord = require("discord.js");
const mergeImages = require('merge-images');

module.exports.run = async(bot, message, args) => {
    const users = message.mentions.users.first() || message.author;
    // console.log(users.user.roles.first())
    let botembed = new Discord.MessageEmbed()
        .setDescription("Bot Information")
        .setColor("#00FFFF")
        .setThumbnail(users.defaultAvatarURL)
        .addField("User Name", users.username);
    return message.channel.send(botembed);
    mergeImages(['/body.png', '/eyes.png', '/mouth.png'])
        .then(b64 => document.querySelector('img').src = b64);
}

module.exports.help = {
    name: "id" //replace with call
}