const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let member = message.mentions.members.first();
    if (!message.member.roles.cache.some(r => ["Admin"].includes(r.name)))
        return message.reply("Sorry, you don't have permissions to use this!");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o => {});
    message.channel.send(sayMessage);
}

module.exports.help = {
    name: "say" //replace with call
}