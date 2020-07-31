const Discord = require("discord.js");
const agent = require('superagent');

module.exports.run = async(bot, message, args) => {
    mchannel = message.channel;
    let ctip = ["Wash your hands frequently and carefully", "Avoid touching your face", "Stop shaking hands and hugging people — for now", "Don’t share personal items", "Cover your mouth and nose when you cough and sneeze", "Clean and disinfect surfaces", "Take social distancing seriously", "Do not gather in groups", "Avoid eating or drinking in public places", "Wash fresh groceries", "Self-quarantine if sick"]
    let tipn = Math.floor(Math.random() * 10);
    message.delete().catch(O_o => {});
    let {
        body
    } = await agent.get('https://covidapi.info/api/v1/global');
    cicon = "https://i.imgur.com/h0nbsOG.png";
    let cupt = new Discord.MessageEmbed()
        .setTitle("Corona Update")
        .setDescription(ctip[tipn])
        .setColor("#FF0000")
        .setThumbnail(cicon)
        .addField("Confirmed cases", body.result.confirmed)
        .addField("Deaths", body.result.deaths)
        .addField("Recovered", body.result.recovered)
        .setFooter(`Last updated at: ` + body.date);

    mchannel.send(cupt);
}

module.exports.help = {
    name: "covid" //replace with call
}