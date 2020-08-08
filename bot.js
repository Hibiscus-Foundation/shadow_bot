const Discord = require("discord.js");
const bot = new Discord.Client({
    disablEveryone: true
});
const fs = require("fs");
const conf = JSON.parse(fs.readFileSync('conf.json'))
let latestActivityID = fs.existsSync('.latestActivityID') ? fs.readFileSync('.latestActivityID') : 0
const Trello = require('trello-events')

const events = new Trello({
    pollFrequency: conf.pollInterval, // milliseconds
    minId: latestActivityID, // auto-created and auto-updated
    start: false,
    trello: {
        boards: conf.boardIDs, // array of Trello board IDs 
        key: process.env.trelloKey, // your public Trello API key
        token: process.env.trelloToken // your private Trello token for Trellobot
    }
})

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
    bot.user.setActivity("Hibiscus Foundation", {
        type: "WATCHING"
    });
    if (!conf.realNames) conf.realNames = true;
    events.start();
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
            return cuser.send("You think you can just edit it out!? This Doggo is smarter than you thought!");
        }
    }
});

bot.on("guildMemberAdd", async member => {
    if (member.user.bot === true) return;
    let welcomechannel = member.guild.channels.cache.find(ch => ch.name === 'general');
    let randomstuff = ["_Bork Bork_", "Does this mean I get more treats?", "Will you pet me?", "Have you followed hibsicused on Instagram yet?", "Did you bring friends?", "I’m excited!", "_Swoons_", "Can you adopt me? No one’s giving me treats :(", "Welcome to the Army!", "Welcome to the Unknown!", "**Finally** we’ve been waiting for you!", "Thank you for taking the leap of faith!", "New server Who this?", "New entry alert *woof*"]
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



/*
 ** =======================
 ** TRELLO EVENT HANDLERS
 ** =======================
 */


events.on('createCard', (event, board) => {
    if (!eventEnabled(`cardCreated`)) return
    let embed = getEmbedBase(event)
        .setTitle(`New card created under __${event.data.list.name}__!`)
        .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card created under __${event.data.list.name}__ by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
    send(addDiscordUserData(embed, event.memberCreator))
})

// Fired when a card is updated (description, due date, position, associated list, name, and archive status)
events.on('updateCard', (event, board) => {
            let embed = getEmbedBase(event)
            if (event.data.old.hasOwnProperty("desc")) {
                if (!eventEnabled(`cardDescriptionChanged`)) return
                embed
                    .setTitle(`Card description changed!`)
                    .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card description changed (see below) by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
                    .addField(`New Description`, typeof event.data.card.desc === "string" && event.data.card.desc.trim().length > 0 ? (event.data.card.desc.length > 1024 ? `${event.data.card.desc.trim().slice(0, 1020)}...` : event.data.card.desc) : `*[No description]*`)
                    .addField(`Old Description`, typeof event.data.old.desc === "string" && event.data.old.desc.trim().length > 0 ? (event.data.old.desc.length > 1024 ? `${event.data.old.desc.trim().slice(0, 1020)}...` : event.data.old.desc) : `*[No description]*`)
                send(addDiscordUserData(embed, event.memberCreator))
            } else if (event.data.old.hasOwnProperty("due")) {
                if (!eventEnabled(`cardDueDateChanged`)) return
                embed
                    .setTitle(`Card due date changed!`)
                    .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card due date changed to __${event.data.card.due ? new Date(event.data.card.due).toUTCString() : `[No due date]`}__ from __${event.data.old.due ? new Date(event.data.old.due).toUTCString() : `[No due date]`}__ by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
        send(addDiscordUserData(embed, event.memberCreator))
    } else if (event.data.old.hasOwnProperty("pos")) {
        if (!eventEnabled(`cardPositionChanged`)) return
        embed
            .setTitle(`Card position changed!`)
            .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card position in list __${event.data.list.name}__ changed by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
        send(addDiscordUserData(embed, event.memberCreator))
    } else if (event.data.old.hasOwnProperty("idList")) {
        if (!eventEnabled(`cardListChanged`)) return
        embed
            .setTitle(`Card list changed!`)
            .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card moved to list __${event.data.listAfter.name}__ from list __${event.data.listBefore.name}__ by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
        send(addDiscordUserData(embed, event.memberCreator))
    } else if (event.data.old.hasOwnProperty("name")) {
        if (!eventEnabled(`cardNameChanged`)) return
        embed
            .setTitle(`Card name changed!`)
            .setDescription(`**CARD:** *[See below for card name]* — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card name changed (see below) by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            .addField(`New Name`, event.data.card.name)
            .addField(`Old Name`, event.data.old.name)
        send(addDiscordUserData(embed, event.memberCreator))
    } else if (event.data.old.hasOwnProperty("closed")) {
        if (event.data.old.closed) {
            if (!eventEnabled(`cardUnarchived`)) return
            embed
                .setTitle(`Card unarchived!`)
                .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card unarchived and returned to list __${event.data.list.name}__ by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            send(addDiscordUserData(embed, event.memberCreator))
        } else {
            if (!eventEnabled(`cardArchived`)) return
            embed
                .setTitle(`Card archived!`)
                .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card under list __${event.data.list.name}__ archived by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            send(addDiscordUserData(embed, event.memberCreator))
        }
    }
})

// Fired when a card is deleted
events.on('deleteCard', (event, board) => {
    if (!eventEnabled(`cardDeleted`)) return
    let embed = getEmbedBase(event)
        .setTitle(`Card deleted!`)
        .setDescription(`**EVENT:** Card deleted from list __${event.data.list.name}__ by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
    send(addDiscordUserData(embed, event.memberCreator))
})

// Fired when a comment is posted, or edited
events.on('commentCard', (event, board) => {
    let embed = getEmbedBase(event)
    if (event.data.hasOwnProperty("textData")) {
        if (!eventEnabled(`commentEdited`)) return
        embed
            .setTitle(`Comment edited on card!`)
            .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card comment edited (see below for comment text) by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            .addField(`Comment Text`, event.data.text.length > 1024 ? `${event.data.text.trim().slice(0, 1020)}...` : event.data.text)
            .setTimestamp(event.data.dateLastEdited)
        send(addDiscordUserData(embed, event.memberCreator))
    } else {
        if (!eventEnabled(`commentAdded`)) return
        embed
            .setTitle(`Comment added to card!`)
            .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card comment added (see below for comment text) by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            .addField(`Comment Text`, event.data.text.length > 1024 ? `${event.data.text.trim().slice(0, 1020)}...` : event.data.text)
        send(addDiscordUserData(embed, event.memberCreator))
    }
})

// Fired when a member is added to a card
events.on('addMemberToCard', (event, board) => {
    let embed = getEmbedBase(event)
        .setTitle(`Member added to card!`)
        .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Member **[${conf.realNames ? event.member.fullName : event.member.username}](https://trello.com/${event.member.username})**`)
    let editedEmbed = addDiscordUserData(embed, event.member)

    if (event.member.id === event.memberCreator.id) {
        if (!eventEnabled(`memberAddedToCardBySelf`)) return
        editedEmbed.setDescription(editedEmbed.description + ` added themselves to card.`)
        send(editedEmbed)
    } else {
        if (!eventEnabled(`memberAddedToCard`)) return
        editedEmbed.setDescription(editedEmbed.description + ` added to card by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
        send(addDiscordUserData(editedEmbed, event.memberCreator))
    }
})

// Fired when a member is removed from a card
events.on('removeMemberFromCard', (event, board) => {
    let embed = getEmbedBase(event)
        .setTitle(`Member removed from card!`)
        .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Member **[${conf.realNames ? event.member.fullName : event.member.username}](https://trello.com/${event.member.username})**`)
    let editedEmbed = addDiscordUserData(embed, event.member)

    if (event.member.id === event.memberCreator.id) {
        if (!eventEnabled(`memberRemovedFromCardBySelf`)) return
        editedEmbed.setDescription(editedEmbed.description + ` removed themselves from card.`)
        send(editedEmbed)
    } else {
        if (!eventEnabled(`memberRemovedFromCard`)) return
        editedEmbed.setDescription(editedEmbed.description + ` removed from card by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
        send(addDiscordUserData(editedEmbed, event.memberCreator))
    }
})

// Fired when a list is created
events.on('createList', (event, board) => {
    if (!eventEnabled(`listCreated`)) return
    let embed = getEmbedBase(event)
        .setTitle(`New list created!`)
        .setDescription(`**EVENT:** List __${event.data.list.name}__ created by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
    send(addDiscordUserData(embed, event.memberCreator))
})

// Fired when a list is renamed, moved, archived, or unarchived
events.on('updateList', (event, board) => {
    let embed = getEmbedBase(event)
    if (event.data.old.hasOwnProperty("name")) {
        if (!eventEnabled(`listNameChanged`)) return
        embed
            .setTitle(`List name changed!`)
            .setDescription(`**EVENT:** List renamed to __${event.data.list.name}__ from __${event.data.old.name}__ by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
        send(addDiscordUserData(embed, event.memberCreator))
    } else if (event.data.old.hasOwnProperty("pos")) {
        if (!eventEnabled(`listPositionChanged`)) return
        embed
            .setTitle(`List position changed!`)
            .setDescription(`**EVENT:** List __${event.data.list.name}__ position changed by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
        send(addDiscordUserData(embed, event.memberCreator))
    } else if (event.data.old.hasOwnProperty("closed")) {
        if (event.data.old.closed) {
            if (!eventEnabled(`listUnarchived`)) return
            embed
                .setTitle(`List unarchived!`)
                .setDescription(`**EVENT:** List __${event.data.list.name}__ unarchived by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            send(addDiscordUserData(embed, event.memberCreator))
        } else {
            if (!eventEnabled(`listArchived`)) return
            embed
                .setTitle(`List archived!`)
                .setDescription(`**EVENT:** List __${event.data.list.name}__ archived by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            send(addDiscordUserData(embed, event.memberCreator))
        }
    }
})

// Fired when an attachment is added to a card
events.on('addAttachmentToCard', (event, board) => {
    if (!eventEnabled(`attachmentAddedToCard`)) return
    let embed = getEmbedBase(event)
        .setTitle(`Attachment added to card!`)
        .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Attachment named \`${event.data.attachment.name}\` added to card by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
    send(addDiscordUserData(embed, event.memberCreator))
})

// Fired when an attachment is removed from a card
events.on('deleteAttachmentFromCard', (event, board) => {
    if (!eventEnabled(`attachmentRemovedFromCard`)) return
    let embed = getEmbedBase(event)
        .setTitle(`Attachment removed from card!`)
        .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Attachment named \`${event.data.attachment.name}\` removed from card by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
    send(addDiscordUserData(embed, event.memberCreator))
})

// Fired when a checklist is added to a card (same thing as created)
events.on('addChecklistToCard', (event, board) => {
    if (!eventEnabled(`checklistAddedToCard`)) return
    let embed = getEmbedBase(event)
        .setTitle(`Checklist added to card!`)
        .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Checklist named \`${event.data.checklist.name}\` added to card by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
    send(addDiscordUserData(embed, event.memberCreator))
})

// Fired when a checklist is removed from a card (same thing as deleted)
events.on('removeChecklistFromCard', (event, board) => {
    if (!eventEnabled(`checklistRemovedFromCard`)) return
    let embed = getEmbedBase(event)
        .setTitle(`Checklist removed from card!`)
        .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Checklist named \`${event.data.checklist.name}\` removed from card by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
    send(addDiscordUserData(embed, event.memberCreator))
})

// Fired when a checklist item's completion status is toggled
events.on('updateCheckItemStateOnCard', (event, board) => {
    if (event.data.checkItem.state === "complete") {
        if (!eventEnabled(`checklistItemMarkedComplete`)) return
        let embed = getEmbedBase(event)
            .setTitle(`Checklist item marked complete!`)
            .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Checklist item under checklist \`${event.data.checklist.name}\` marked complete by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            .addField(`Checklist Item Name`, event.data.checkItem.name.length > 1024 ? `${event.data.checkItem.name.trim().slice(0, 1020)}...` : event.data.checkItem.name)
        send(addDiscordUserData(embed, event.memberCreator))
    } else if (event.data.checkItem.state === "incomplete") {
        if (!eventEnabled(`checklistItemMarkedIncomplete`)) return
        let embed = getEmbedBase(event)
            .setTitle(`Checklist item marked incomplete!`)
            .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Checklist item under checklist \`${event.data.checklist.name}\` marked incomplete by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            .addField(`Checklist Item Name`, event.data.checkItem.name.length > 1024 ? `${event.data.checkItem.name.trim().slice(0, 1020)}...` : event.data.checkItem.name)
        send(addDiscordUserData(embed, event.memberCreator))
    }
})

/*
 ** =======================
 ** Miscellaneous Trello functions
 ** =======================
 */

events.on('maxId', (id) => {
    if (latestActivityID == id) return
    latestActivityID = id
    fs.writeFileSync('.latestActivityID', id)
})

const send = (embed, content = ``) => conf.channel.send(`${content} ${conf.contentString}`, {
    embed: embed
}).catch(err => console.error(err))

const eventEnabled = (type) => conf.enabledEvents.length > 0 ? conf.enabledEvents.includes(type) : true

const logEventFire = (event) => console.log(`${new Date(event.date).toUTCString()} - ${event.type} fired`)

const getEmbedBase = (event) => new Discord.RichEmbed()
    .setFooter(`${conf.guild.members.get(bot.user.id).displayName} • ${event.data.board.name} [${event.data.board.shortLink}]`, bot.user.displayAvatarURL)
    .setTimestamp(event.hasOwnProperty(`date`) ? event.date : Date.now())
    .setColor("#127ABD")

//  Converts Trello @username mentions in titles to Discord mentions, finds channel and role mentions, and mirros Discord user mentions outside the embed
const convertMentions = (embed, event) => {

}

// adds thumbanil and appends user mention to the end of the description, if possible
const addDiscordUserData = (embed, member) => {
    if (conf.userIDs[member.username]) {
        let discordUser = conf.guild.members.get(conf.userIDs[member.username])
        if (discordUser) embed
            .setThumbnail(discordUser.user.displayAvatarURL)
            .setDescription(`${embed.description} / ${discordUser.toString()}`)
    }
    return embed
}




bot.login(process.env.token);