const Discord = require("discord.js");
const mergeImages = require('merge-images');

module.exports.run = async(bot, message, args) => {
    const user = message.mentions.users.first() || message.author;
    console.log(user.roles.first())
    let botembed = new Discord.MessageEmbed()
        .setDescription("Bot Information")
        .setColor("#00FFFF")
        .setThumbnail(user.avatarURL)
        .addField("User Name", user.username);
    return message.channel.send(botembed);
    mergeImages(['/body.png', '/eyes.png', '/mouth.png'])
        .then(b64 => document.querySelector('img').src = b64);
}

module.exports.help = {
    name: "id" //replace with call
}