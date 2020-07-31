const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let bicon = bot.user.displayAvatarURL();
    let botembed = new Discord.MessageEmbed()
        .setDescription("Bot Information")
        .setColor("#00FFFF")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Created on", bot.user.createdAt);
    return message.channel.send(botembed);
}

module.exports.help = {
    name: "info" //replace with call
}