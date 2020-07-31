const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let banIcon = message.mentions.users.first().displayAvatarURL();

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if (!member)
        return message.reply("Please mention a valid member of this server");
    if (!member.bannable)
        return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');

    if (!reason)
        return message.reply("Please indicate a reason for the ban!");

    let Banembed = new Discord.MessageEmbed()
        .setDescription("Moderator Log")
        .setColor("#FF0000")
        .setThumbnail(banIcon)
        .addField("Banned User", `${member}`)
        .addField("Reason", reason)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reported by", `${message.author} ID:${message.author.id}`);

    await member.ban(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.delete().catch(O_o => {});
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`)
        .then(msg => {
            msg.delete({
                timeout: 30000
            });
        })
        .catch(console.log("ERROR"));
    let bchannel = message.guild.channels.cache.find(ch => ch.name === 'reports');
    bchannel.send(Banembed);
}

module.exports.help = {
    name: "ban" //replace with call
}