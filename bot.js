const Discord = require("discord.js");
const bot = new Discord.Client({
    disablEveryone: true
});
const fs = require("fs");

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    var jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands"); //If the command dosen't exist the bot shuts down
        return;
    } else console.log("Commands found");
    jsfile.forEach((f, i) => {
        var cmds = require(`./commands/${f}`);
        bot.commands.set(cmds.help.name, cmds);
    });
});

bot.on("ready", async() => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Secret Game Night", {
        type: "PLAYING"
    });
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let prefix = process.env.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let handlercmd = message.content.slice(prefix.length).split(" ");
    let args = messageArray.slice(1);

    if (message.content.startsWith(prefix)) {
        var hcmd = bot.commands.get(handlercmd[0])
        if (hcmd) hcmd.run(bot, message, args);
    }

    if (message.content.toLowerCase().includes("discord") && message.content.includes(".") && message.content.toLowerCase().includes("/")) {
        let cuser = message.member;
        if (!cuser.hasPermission('ADMINISTRATOR')) {
            message.delete();
            message.channel.send("**Invite deleted** :eyes:")
                .then(msg => {
                    msg.delete(60000);
                })
                .catch();
            cuser.send("Sending discord invites is not allowed!");
        }
    }
});

bot.on("messageUpdate", (oldMessage, newMessage) => {
    if (newMessage.content.toLowerCase().includes("discord") && newMessage.content.includes(".") && newMessage.content.toLowerCase().includes("/")) {
        let cuser = newMessage.member;
        if (!cuser.hasPermission('ADMINISTRATOR')) {
            newMessage.delete();
            newMessage.channel.send("**Invite deleted** :eyes:")
                .then(msg => {
                    msg.delete(60000);
                })
                .catch();
            return cuser.send("You think you can just edit it out!? This Maid is better than you thought!");
        }
    }
});

bot.on("guildMemberAdd", async member => {
    if (member.user.bot === true) return;
    let welcomechannel = member.guild.channels.cache.find(ch => ch.name === 'general');
    let randomstuff = ["_Bork Bork_", "Does this mean I get more treats?", "Will you pet me?", "Have you followed hibsicused on Instagram yet?", "Did you bring friends?", "I’m excited", "_Swoons_", "Can you adopt me? No one’s giving me treats :("]
    let rq = randomstuff.length;
    let rn = Math.floor(Math.random() * rq);
    welcomechannel.send(`Look out everyone!! ${member} has spawned!! ` + randomstuff[rn]);
    let ruleschannel = member.guild.channels.cache.find(ch => ch.name === 'about-us');
    member.send(`Hey there thanks for joining the Server! Please go to ${ruleschannel} and to know more about us and the event. Also don't forget to introduce yourself in ${welcomechannel}`);
    let zchannel = member.guild.channels.cache.find(ch => ch.name === 'members-log');
    zchannel.send(`${member} has joined the server! Im keeping a watch :)`);
});

bot.on("guildMemberRemove", async member => {
    let users = member.user;
    let usern = users.username;
    let pfp = users.displayAvatarURL();
    let disc = users.discriminator;
    let left = new Discord.MessageEmbed()
        .setAuthor(usern)
        .setDescription(`${usern} left the server!`)
        .setColor("#00FFFF")
        .setThumbnail(pfp)
        .addField("User ID", `${usern}#${disc}`);
    let welcomechannel = member.guild.channels.cache.find(ch => ch.name === 'members-log');
    welcomechannel.send(left);
});


bot.login(process.env.token);