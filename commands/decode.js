const Discord = require("discord.js");
const agent = require('superagent');

module.exports.run = async (bot, message, args) => {
    mchannel = message.channel;
    morseArgs = args.join().replace(/`/g, '').replace(/,/g, '%20').replace(/[\\\/]/g, '%20').replace(/[\\\\]/g, '%20');
    console.log(morseArgs);
    if (morseArgs.slice(0, 6) == "%20%20") {
        let {
            body
        } = await agent.get('http://www.morsecode-api.de/decode?string=' + morseArgs.slice(6));
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
    } else if (morseArgs.slice(0, 3) == "%20") {
        let {
            body
        } = await agent.get('http://www.morsecode-api.de/decode?string=' + morseArgs.slice(3));
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
    } else {
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
}

module.exports.help = {
    name: "decode" //replace with call
}