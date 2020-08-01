const Discord = require("discord.js");
const agent = require('superagent');
const body = require("../quotes.json")

module.exports.run = async(bot, message, args) => {

    mchannel = message.channel;
    let ctip = ["Have a great day!", "Hope you are having a good day!", "Smile", "PSA, your smile is precious", "You got this", "I’m proud of you", "You are loved", "You are strong", "You are beautiful", "I’m proud of you", "This too shall pass"]
    let tq = ctip.length;
    let tipn = Math.floor(Math.random() * tq);
    let qq = body.length;
    let qn = Math.floor(Math.random() * qq);
    message.delete().catch(O_o => {});

    cicon = "https://i.imgur.com/HrQ300c.png";
    let cupt = new Discord.MessageEmbed()
        .setTitle("Quote time!")
        .setColor("#FF0000")
        .setThumbnail(cicon)
        .addField(body[qn].text, body[qn].author)
        .setFooter(ctip[tipn]);
    mchannel.send(cupt);
}

module.exports.help = {
    name: "quote" //replace with call
}