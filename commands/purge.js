const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply("Sorry, you don't have permissions to use this!");
    const deleteCount = parseInt(args[0], 10);
    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    let deletenow = deleteCount + 1;
    message.channel.bulkDelete(deletenow);
    message.channel.send(`Deleted ${deleteCount} messages for you :)`)
        .then(msg => {
            msg.delete({
                timeout: 5000
            });
        })
        .catch(O_o => {});
}

module.exports.help = {
    name: "purge" //replace with call
}