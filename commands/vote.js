const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    message.channel.messages.fetch({
        limit: 2
    }).then(res => {
        let lm = res.last();
        if (args[0] == 1) {
            lm.react(':one:');
            // if (error) console.error('One of the emojis failed to react.');
        } else if (args[0] == 2) {
            lm.react(':one:')
                .then(() => lm.react(':two:'))
                // .catch(() => console.error('One of the emojis failed to react.'));
        } else if (args[0] == 3) {
            lm.react(':one:')
                .then(() => lm.react(':two:'))
                .then(() => lm.react(':three:'))
                // .catch(() => console.error('One of the emojis failed to react.'));
        } else if (args[0] == 4) {
            lm.react(':one:')
                .then(() => lm.react(':two:'))
                .then(() => lm.react(':three:'))
                .then(() => lm.react(':four:'))
                // .catch(() => console.error('One of the emojis failed to react.'));

        } else if (args[0] == 5 || !args[0]) {
            lm.react(':one:')
                .then(() => lm.react(':two:'))
                .then(() => lm.react(':three:'))
                .then(() => lm.react(':four:'))
                .then(() => lm.react(':five:'))
                // .catch(() => console.error('One of the emojis failed to react.'));
        }
    });
}

module.exports.help = {
    name: "vote" //replace with call
}