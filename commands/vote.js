const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    message.channel.messages.fetch({
        limit: 2
    }).then(res => {
        let no = args[0];
        let lm = res.last();
        if (no == 1) {
            try {
                await lm.react(':one:');
            } catch (error) {
                console.error('One of the emojis failed to react.');
            }
        } else if (no == 2) {
            try {
                await lm.react(':one:');
                await lm.react(':two:');
            } catch (error) {
                console.error('One of the emojis failed to react.');
            }
        } else if (no == 3) {
            try {
                await lm.react(':one:');
                await lm.react(':two:');
                await lm.react(':three:');
            } catch (error) {
                console.error('One of the emojis failed to react.');
            }
        } else if (no == 4) {
            try {
                await lm.react(':one:');
                await lm.react(':two:');
                await lm.react(':three:');
                await lm.react(':four:');
            } catch (error) {
                console.error('One of the emojis failed to react.');
            }
        } else if (no == 5) {
            try {
                await lm.react(':one:');
                await lm.react(':two:');
                await lm.react(':three:');
                await lm.react(':four:');
                await lm.react(':five:');
            } catch (error) {
                console.error('One of the emojis failed to react.');
            }
        }
    });
}

module.exports.help = {
    name: "vote" //replace with call
}