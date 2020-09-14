const Discord = require("discord.js");
const agent = require('superagent');

module.exports.run = async (bot, message, args) => {
    mchannel = message.channel;
    console.log(args)
    morseArgs = args.join().replace(/`/g, '').replace(/,/g, '%20');
    if (morseArgs.slice(0, 2) == "%20") morseArgs.slice(3);
    console.log(morseArgs.slice(0, 2))
    console.log(morseArgs) //TESTING ONLY
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