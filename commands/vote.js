const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    message.delete().catch(O_o => {});
    message.channel.messages.fetch({
        limit: 1
    }).then(res => {
        let lm = res.first();
        if (args[0] == 1) {
            lm.react('🇦');
        } else if (args[0] == 2) {
            lm.react('🇦')
                .then(() => lm.react('🇧'))
        } else if (args[0] == 3) {
            lm.react('🇦')
                .then(() => lm.react('🇧'))
                .then(() => lm.react('🇨'))
        } else if (args[0] == 4) {
            lm.react('🇦')
                .then(() => lm.react('🇧'))
                .then(() => lm.react('🇨'))
                .then(() => lm.react('🇩'))

        } else if (args[0] == 5 || !args[0]) {
            lm.react('🇦')
                .then(() => lm.react('🇧'))
                .then(() => lm.react('🇨'))
                .then(() => lm.react('🇩'))
                .then(() => lm.react('🇪'))
        }
    });
    // message.channel.messages.fetch({
    //     limit: 2
    // }).then(res => {
    //     let lm = res.last();
    //     if (args[0] == 1) {
    //         lm.react('🇦');
    //     } else if (args[0] == 2) {
    //         lm.react('🇦')
    //             .then(() => lm.react('🇧'))
    //     } else if (args[0] == 3) {
    //         lm.react('🇦')
    //             .then(() => lm.react('🇧'))
    //             .then(() => lm.react('🇨'))
    //     } else if (args[0] == 4) {
    //         lm.react('🇦')
    //             .then(() => lm.react('🇧'))
    //             .then(() => lm.react('🇨'))
    //             .then(() => lm.react('🇩'))

    //     } else if (args[0] == 5 || !args[0]) {
    //         lm.react('🇦')
    //             .then(() => lm.react('🇧'))
    //             .then(() => lm.react('🇨'))
    //             .then(() => lm.react('🇩'))
    //             .then(() => lm.react('🇪'))
    //     }
    // });
}

module.exports.help = {
    name: "vote" //replace with call
}