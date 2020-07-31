const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nah dont think you can ...");
    let muted = message.mentions.members.first();
    if (!muted) return message.channel.send("You didnt tag a member!");
    let muterole = message.guild.roles.cache.find(ch => ch.name === 'Muted');
    if (!muterole) console.log("MUTE ROLE DOSENT EXISTS");
    let tit = args[1];
    let reason = args.slice(2).join(' ');
    let mchannel = message.guild.channels.cache.find(ch => ch.name === 'reports');
    let muter = message.author;

    muted.addRole(muterole.id);
    if (tit) {
        setTimeout(function() {
            muted.removeRole(muterole.id);
            message.channel.send(`${muted} has been unmuted!`);
            mchannel.send(`${muted} has been unmuted after ${tit} minutes!`);
        }, tit * 60000);
        message.channel.send(`${muted} has been muted for ${tit} minutes...`);
        mchannel.send(`${muted} has been muted for ${tit} minutes by ${muter}`);
    } else {
        message.channel.send(`${muted} has been muted!`);
        mchannel.send(`${muted} has been muted by ${muter}!`);
    }
}

module.exports.help = {
    name: "mute" //replace with call
}