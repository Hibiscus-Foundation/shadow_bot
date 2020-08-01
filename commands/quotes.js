const Discord = require("discord.js");
const agent = require('superagent');
const body = require("../quotes.json")

module.exports.run = async(bot, message, args) => {

    mchannel = message.channel;
    let ctip = ["Have a great day!", "Hope you are having a good day!", "Smile", "PSA, your smile is precious"]
    let tipn = Math.floor(Math.random() * 4);
    let qq = body.length;
    let qn = Math.floor(Math.random() * qq);
    // message.delete().catch(O_o => {});

    cicon = "https://i.imgur.com/HrQ300c.png";
    let cupt = new Discord.MessageEmbed()
        .setTitle("Quote time!")
        .setColor("#FF0000")
        .setThumbnail(cicon)
        .addField(body[qn].author, body[qn].text)
        .setFooter(ctip[tipn]);

    mchannel.send(cupt);
}

module.exports.help = {
    name: "quote" //replace with call
}