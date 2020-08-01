const Discord = require("discord.js");
const agent = require('superagent');

module.exports.run = async(bot, message, args) => {
    mchannel = message.channel;
    let ctip = ["Have a great day!", "Hope you are having a good day!", "Smile", "PSA, your smile is precious"]
    let tipn = Math.floor(Math.random() * 4);
    message.delete().catch(O_o => {});
    let body = await agent.get('https://type.fit/api/quotes');
    cicon = "https://i.imgur.com/HrQ300c.png";
    let cupt = new Discord.MessageEmbed()
        .setTitle("Quote time!")
        .setDescription(ctip[tipn])
        .setColor("#FF0000")
        .setThumbnail(cicon)
        .addField(body[0].author, body[0].text)
        .setFooter("Hope this helped :), woof!");

    mchannel.send(cupt);
}

module.exports.help = {
    name: "quote" //replace with call
}