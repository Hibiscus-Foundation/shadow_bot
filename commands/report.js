const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.channel.send("Couldn't find mentioned user in the Nest.");
    let reason = args.join(" ").slice(22);
    let ricon = message.mentions.users.first().displayAvatarURL();
    let uicon = "https://i.imgur.com/1v6KXkr.png";

    let rembed = new Discord.MessageEmbed()
        .setDescription("Report Log")
        .setColor("#FF0000")
        .setThumbnail(ricon)
        .addField("Reported User", `${rUser}`)
        .addField("Reason", reason)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reported by", `${message.author} ID:${message.author.id}`);

    let wembed = new Discord.MessageEmbed()
        .setDescription("Your report has been submitted!")
        .setColor("#FF0000")
        .setThumbnail(uicon)
        .addField("Reported", `UserID:${rUser.id}`)
        .addField("Abusing this function will result in mute/kick/ban", `${message.author} hope you have valid proff(screenshot) ready!`);

    let rchannel = message.guild.channels.cache.find(ch => ch.name === 'reports');
    message.delete().catch(O_o => {});
    rchannel.send(rembed);
    return message.channel.send(wembed)
        .then(msg => {
            msg.delete({
                timeout: 30000
            });
        })
        .catch(console.log("ERROR"));
}

module.exports.help = {
    name: "report" //replace with call
}