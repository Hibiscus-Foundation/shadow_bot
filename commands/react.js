const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    message.channel.lastMessage.react('😄');
}

module.exports.help = {
    name: "react" //replace with call
}