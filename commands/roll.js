const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let diceRoll = Math.floor((Math.random() * 10) + 1);
    let dicon = "https://i.imgur.com/kzm46fB.png"
    let sChance = 0;

    if (diceRoll > 3 && diceRoll < 7) {
        sChance = 1;
    }
    if (diceRoll > 6 && diceRoll < 10) {
        sChance = 2;
    }
    if (diceRoll === 10) {
        sChance = 3;
    }

    switch (sChance) {
        case 1:
            success = " You'll have to reroll! ";
            break;
        case 2:
            success = " You were successful!!! ";
            break;
        case 3:
            success = " Your move is unavoidable!! ";
            break;
        default:
            success = " You were unsuccessful! :( ";
            break;
    }

    let dembed = new Discord.MessageEmbed()
        .setDescription("You roll the dice")
        .setColor("#FFBF00")
        .setThumbnail(dicon)
        .addField("You roll", diceRoll)
        .addField("Result", success);

    return message.channel.send(dembed);
}

module.exports.help = {
    name: "roll" //replace with call
}