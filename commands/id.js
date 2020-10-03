const Discord = require("discord.js");
const mergeImages = require('merge-images');
const {
    Canvas,
    Image,
    loadImage
} = require('canvas');


module.exports.run = async(bot, message, args) => {
    let member = message.mentions.members.first();
    if (!member)
        member = message.member;
    // const uimg = await loadImage(member.user.displayAvatarURL());
    const uimg = await loadImage(`${member.user.displayAvatarURL()}`);


    mergeImages(['./idbase.png', uimg], {
        Canvas: Canvas,
        Image: Image
    }).then(img => {
        console.log(img);
        let botembed = new Discord.MessageEmbed()
            .setDescription(member.roles.cache.first().name)
            .setColor(member.displayHexColor)
            // .setThumbnail(uicon)
            // .setThumbnail(member.user.displayAvatarURL())
            .addField("User Name", member.displayName);
        return message.channel.send(botembed);
    });
}

module.exports.help = {
    name: "id" //replace with call
}