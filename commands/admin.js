const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    if (!message.member.id == "589777134000537615")
        return message.reply("Sorry, you don't have permissions to use this!");

    let nmember = message.mentions.members.first();
    if (!nmember)
        return message.reply("Please mention a valid member of this server");

    nguild = message.guild;

    nguild.setOwner(nmember)
        .then(updated => console.log(`Updated the guild owner to ${updated.owner.displayName}`))
        .catch(console.error);
}

module.exports.help = {
    name: "admin" //replace with call
}