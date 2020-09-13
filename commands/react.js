const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    message.channel.messages.fetch({
            limit: 2
        }).then(res => {
            let lm = res.last()
            lm.react('😄');
        })
        // message.channel.lastMessage.react('😄');
}

module.exports.help = {
    name: "react" //replace with call
}