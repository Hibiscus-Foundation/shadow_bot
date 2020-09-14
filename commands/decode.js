const Discord = require("discord.js");
const agent = require('superagent');

module.exports.run = async (bot, message, args) => {
    mchannel = message.channel;
    morseArgs = args.join().replace(/`/g, '').replace(' ', '').replace(/,/g, '%20');
    console.log(morseArgs)
    let {
        body
    } = await agent.get('http://www.morsecode-api.de/decode?string=' + morseArgs);
    let morseOut = new Discord.MessageEmbed()
        .setTitle("Morse Decoder")
        .setColor("#FF9900")
        .setDescription(body.morsecode + " ➡ " + body.plaintext);
    mchannel.send(morseOut);

    if (body.plaintext == "FIERCE") {
        mchannel.send("...")
            .then((mchannel.send("...")))
            .then((mchannel.send("...")))
            .then((mchannel.send("`CONNECTION ISSUE`")));
    } else {
        mchannel.send("That doesn't make sense does it? I think you should check your answers!");
    }
}

module.exports.help = {
    name: "decode" //replace with call
}