const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let hicon = "https://i.imgur.com/GANfuj5.png";
    let gicon = "https://i.imgur.com/r2Hge5W.png";
    let micon = "https://i.imgur.com/N5y9l68.png";
    let ficon = "https://i.imgur.com/dUh8NPS.png";
    let sicon = "https://i.imgur.com/FCvIb62.png";

    let helpembed = new Discord.MessageEmbed()
        .setDescription("Help Menu!")
        .setThumbnail(hicon)
        .setColor("#FF6B65")
        .addField("General Commands", "Use ``>help gen`` for General commands")
        .addField("Moderator Commands", "Use ``>help mod`` for Moderator commands")
        .addField("Fun Commands", "Use ``>help fun`` for Fun commands")
        .addField("Support Commands", "Use ``>help supp`` for Support commands")
        .addField("Developer", "Purukitto");

    let gembed = new Discord.MessageEmbed()
        .setDescription("Help Menu-General")
        .setThumbnail(gicon)
        .setColor("#FF6B65")
        .addField(">ping", "To check Weeb's latency")
        .addField(">info", "For a little background check on me! OwO")
        .addField(">sinfo", "For basic server information")
        .addField(">mcount", "Displays the current number of members in the server");

    let membed = new Discord.MessageEmbed()
        .setDescription("Help Menu-Moderator")
        .setThumbnail(micon)
        .setColor("#FF6B65")
        .addField(">mute", "Mutes a member for a specified time")
        .addField(">warn", "Warn a user for repeatedly breaking rules")
        .addField(">kick", "Kick a user")
        .addField(">purge", "Delete specified number of messages");

    let fembed = new Discord.MessageEmbed()
        .setDescription("Help Menu-Fun")
        .setThumbnail(ficon)
        .setColor("#FF6B65")
        .addField(">roll", "Roll the dice")
        .addField(">8ball", "Ask the mystic ball for guidance")
        .addField(">quote", "Get a pretty sweet quote from our side");


    let sembed = new Discord.MessageEmbed()
        .setDescription("Help Menu-Support")
        .setThumbnail(sicon)
        .setColor("#FF6B65")
        .addField(">report", "Report a user for breaking rules or being a douche");

    if (!args[0]) {
        message.channel.send(helpembed);
    }
    if (args[0]) {
        let menu = args[0];
        switch (menu) {
            case "gen":
                message.channel.send(gembed);
                break;
            case "mod":
                message.channel.send(membed);
                break;
            case "fun":
                message.channel.send(fembed);
                break;
            case "supp":
                message.channel.send(sembed);
                break;
            default:
                message.channel.send(helpembed);
                break;
        }
    }
}

module.exports.help = {
    name: "help" //replace with call
}