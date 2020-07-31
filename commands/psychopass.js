const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let member = message.mentions.members.first();
    // let cc = Math.floor((Math.random() * 899) + 1);
    let sChance = Math.floor((Math.random() * 3) + 1);

    // if (cc < 100) {
    //     sChance = 1;
    // }
    // if (cc > 99 && cc < 300) {
    //     sChance = 2;
    // }
    // if (cc > 300) {
    //     sChance = 3;
    // }
    if (sChance == 1) {
        cc = Math.floor((Math.random() * 99) + 1);
    }
    if (sChance == 2) {
        cc = Math.floor(Math.random() * (299 - 100) + 100);
    }
    if (sChance == 3) {
        cc = Math.floor(Math.random() * (899 - 300) + 300);
    }

    switch (sChance) {
        case 1:
            success = " Suspect is not a target for enforcement action. The trigger of Dominator will be locked. ";
            break;
        case 2:
            success = " Suspect is classified as a latent criminal and is a target for enforcement action. Dominator is set to Non-Lethal Paralyzer mode. ";
            break;
        case 3:
            success = " Suspect poses a serious threat to the society. Lethal force is authorized. ";
            break;
    }

    let ppicon = "https://i.imgur.com/eXZT2N2.png";
    let ppembed = new Discord.MessageEmbed()
        .setDescription("Sibyl System")
        .setColor("#00FFFF")
        .setThumbnail(ppicon)
        .addField("Criminal Coefficient", cc)
        .addField("Action", success);
    let ccembed = new Discord.MessageEmbed()
        .setDescription("Sibyl System")
        .setColor("#00FFFF")
        .setThumbnail(ppicon)
        .addField("Suspect identified", member)
        .addField("Criminal Coefficient", cc)
        .addField("Action", success);

    if (member)
        return message.channel.send(ccembed);

    if (!member)
        return message.channel.send(ppembed);

}

module.exports.help = {
    name: "psychopass" //replace with call
}