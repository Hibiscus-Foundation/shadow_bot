const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.channel.send("Couldn't find mentioned user in the Nest.");
    let reason = args.join(" ").slice(22);
    let ricon = message.mentions.users.first().displayAvatarURL();

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply("Sorry, you don't have permissions to use this!");
    if (!rUser)
        return message.reply("Please mention a valid member of this server");
    if (!rUser.kickable)
        return message.reply("Ig you are going out of your boundaries now *Reeee*");
    if (!reason)
        return message.reply("Please indicate a reason for the kick!");

    let rembed = new Discord.MessageEmbed()
        .setDescription("Warn Log")
        .setColor("#FF0000")
        .setThumbnail(ricon)
        .addField("Warned User", `${rUser}`)
        .addField("Reason", reason)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Warned by", `${message.author} ID:${message.author.id}`);

    let warnembed = new Discord.MessageEmbed()
        .setDescription("Warned by MODERATOR")
        .setColor("#FF0000")
        .addField("Reason", reason)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reported by", `${message.author} ID:${message.author.id}`);

    let rchannel = message.guild.channels.cache.find(ch => ch.name === 'reports');
    message.delete().catch(O_o => {});
    rchannel.send(rembed);
    return rUser.send(warnembed);
    //return message.channel.send(wembed);
}

module.exports.help = {
    name: "warn" //replace with call
}