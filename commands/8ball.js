const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    if (!args[2]) return message.reply("Please ask a full question!");
    let replies = ["It is certain", " It is decidedly so", "Without a doubt", "Yes definitely", "Most likely", " Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful", "Don't count on it"];
    let result = Math.floor((Math.random() * replies.length));
    let question = args.join(" ");
    let eicon = "https://i.imgur.com/9SSc7za.png"

    let ballembed = new Discord.MessageEmbed()
        .setAuthor("The Mystic 8ball")
        .setThumbnail(eicon)
        .setColor("#FF9900")
        .addField("Question", question)
        .addField("Answer", replies[result]);

    message.channel.send(ballembed);
}

module.exports.help = {
    name: "8ball" //replace with call
}