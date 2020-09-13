const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    message.channel.messages.fetch({
        limit: 2
    }).then(res => {
        let no = args[0];
        let lm = res.last();
        for (i = 0; i < no; i++) {
            try {
                lm.react(':one:');
            } catch (error) {
                console.error('One of the emojis failed to react.');
            }
        }
    });
}

module.exports.help = {
    name: "vote" //replace with call
}