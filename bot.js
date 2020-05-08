const Discord = require("discord.js");
const fs = require("fs");
const ytdl = require('ytdl-core');
const db = require('quick.db');
const send = require('quick.hook');
const ms = require('ms');
const DEFAULTPREFIX = "-";
const ownerID = "310304772588830720";
const active = new Map();
const os = require('os');
const arch = os.arch()
const superagent = require('superagent');
const Canvas = require('canvas');

const cmdFiles = fs.readdir("./commands/");
const used = process.memoryUsage().heapUsed / 1024 / 1024;

let totalSeconds = process.uptime();
let realTotalSecs = Math.floor(totalSeconds % 60);
let days = Math.floor((totalSeconds % 31536000) / 86400);
let hours = Math.floor((totalSeconds / 3600) % 24);
let mins = Math.floor((totalSeconds / 60) % 60);
let cooldown = new Set();
let cdseconds = 5;
let usernameUser = 'displayAvatarURL';

var bot = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, bot);
const mentionHook = new Discord.WebhookClient("553094615755128853", "f27Z4xo4r6Q7L_QH3ZgE1qkb82VcfVBkaHyT11zLEeJX-q1h8ZT6AJs_RnoapAeTXK0o");
const func = require('./functions.js');
// Bot Stats
const botStats = {
  totalGuildsID: '550663848336556053',
  totalUsersID: '458494640828710913',
  totalChannelsID: '458495013811257344'
}

fs.readdir("./events/", (err, files) => {
	if (err) console.log(err);
	files.forEach(file => {
		let eventFunc = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		bot.on(eventName, (...args) => eventFunc.run(bot, ...args));
	});
});

dbl.on('posted', () => {
  console.log('Server count posted!');
})
 
dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

bot.on("message", async message => {
  
  var PREFIXES = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!PREFIXES[message.guild.id]) {
    PREFIXES[message.guild.id] = {
      PREFIXES: DEFAULTPREFIX
    };
  }


  var PREFIX = "-";
  
  if (message.author.bot) return;

  if (!message.content.startsWith(PREFIX)) return;

  if (!message.guild) return;

  if (cooldown.has(message.author.id)) {
    return message.reply("You have to wait 5 seconds between commands.").then(m => m.delete(5000));
  }
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    cooldown.add(message.author.id);
  }

  var args = message.content.slice(PREFIX.length).trim().split(" ");
  var command = args.shift().toLowerCase();



  try {

    delete require.cache[require.resolve(`./commands/${command}.js`)];

    let ops = {
      ownerID: ownerID,
      active: active
    }

    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(bot, message, args, ops, PREFIX, func);

  } catch (e) {
    console.log(e.message)
  } finally {
    console.log(`${message.author.tag} menggunakan perintah ${command}`);
  }

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

  if (message.isMentioned("407076961786134539")) {
    mentionHook.send(`${message.author.tag} MENTION KAMU TADI`)
  }

  
  if (command == "esay") {
    if (!message.member.roles.some(r => ["Owner", "Admin", "Moderator", "CoLeader", "Mod"].includes(r.name)))
      return message.reply("⛔ Sorry, you don't have role named: **Owner/Admin/Mod/Coleader/Moderator** to use this!");

    const sayMessage = args.join(" ");

    let servIcon = message.guild.iconURL;
    let esayEmbed = new Discord.RichEmbed()
      .setTitle("💬 Say")
      .setColor("#0537ff")
      .setThumbnail(servIcon)
      .setDescription(`📝 Said by ${message.author}`)
      .addField("Message", `${sayMessage}`)
      .setTimestamp();

    const esayMessage = args.join(" ");

    message.delete({timeout: 1000});

    message.channel.send(esayEmbed);
  }

  if (command == "botinfo") {
    let bicon = bot.user.displayAvatarURL;
    let helpmember = new Discord.RichEmbed()
      .setDescription("Bot Info:")
      .setColor('RANDOM')
      .addField("<:bottag:446923537228496896> Bot Name", `${bot.user.tag}`)
      .addField("👑 Creator", "<@!618815086512832533xº> | Adi820")
      .addField("🗓️ Created At", `${bot.user.createdAt}`)
      .addField('<:nodejs:446922023529086976> Node', `${process.version}`)
      .addField('<:nodejs:446922023529086976> Library', 'discord.js')
      .addField('💻 Operating System', `${os.platform} ${arch}`)
      .addField(`💬 Want to see last update ${bot.user.username}?`, `Usage \`${PREFIX}changelog\``)
      .addField(`💬 Found any bug?`, `Usage \`${PREFIX}bug <specify a bug>\``)
      .addField("📑 **Usefull link**", "[Invite me](https://discordapp.com/oauth2/authorize?client_id=452360666020577281&scope=bot&permissions=2012593399) | [Vote me](https://discordbots.org/bot/452360666020577281/vote) | [Support Server](https://discord.gg/kDAYc8M)") 
      .setThumbnail(bicon)
      .setFooter(`Requested by: ${message.author.tag}`)
    message.channel.send(helpmember);
  };

  if (command == "serverinfo") {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
      .setAuthor(`Info Server`, `${sicon}`)
      .setColor("RANDOM")
      .setThumbnail(sicon)
      .addField("📝 Server Name", message.guild.name)
      .addField("📅 Created At", message.guild.createdAt)
      .addField(`👑 Owner:`, `${message.guild.owner}`)
      .addField('👥 Total Members', `**${message.guild.memberCount}**`, true)
      .addField('🙇🏻 Humans', `**${message.guild.members.filter(member => !member.user.bot).size}**`, true)
      .addField('🤖 Bots', `**${message.guild.members.filter(member => member.user.bot).size}**`, true)
      .addField('📜 Member Status', `**${message.guild.members.filter(o => o.presence.status === 'online').size}**<:online:449590947165110283> Online\n**${message.guild.members.filter(i => i.presence.status === 'idle').size}**<:away:449590947110584321> Idle/Away\n**${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}**<:dnd:449590946879766539> Do Not Disturb\n**${message.guild.members.filter(off => off.presence.status === 'offline').size}**<:offline:449590947047669760> Offline/Invisible`)
      .addField("🗓️ You Joined", message.member.joinedAt)
      .addField('📍 Your Current Roles', `${message.member.roles.map(roles => roles).join(' => ')}`) 
      .addField('📌 Guild Current Roles', `${message.guild.roles.map(roles => roles).join('  ')}`) 
      .setTimestamp()
      .setFooter(`Requested by: ${message.author.tag}`)
    message.channel.send(serverembed);

  };
});

bot.on("guildMemberRemove", async (member, client, message, args, level) => {  
            var namam = member.user.username
            var jadim = namam.length > 12 ? namam.substring(0, 10) + "..." : namam;
            async function createCanvas() {
            var imageUrlRegex = /\?size=2048$/g;
              
            var {body: background} = await superagent.get("https://www.wallpapersbrowse.com/images/gd/gdevp6k.jpg");
            var {body: avatar} = await superagent.get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));

            return new Canvas(856, 376)
              .addImage(avatar, 100, 50, 256, 256, 128)
      .setColor('#ff0000')
              .setTextFont('50px System')
              .setTextAlign('center')
              .setTextFont('30px Arial')
              .addImage(background, 0, 0, 856, 376)
              .addText("Goodbbye", 260, 325)
              .addText(`${jadim}#${member.user.discriminator}`, 260, 355)
              .addRoundImage(avatar, 135, 10, 256, 256, 128)
              .toBufferAsync();
            }
  var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
 let welcomesetting = JSON.parse(fs.readFileSync("./welcomeonoff.json", "utf8"));
     if (!welcomesetting[member.guild.id]) {
    welcomesetting[member.guild.id] = {
     values: 1
      };
    }
    if(!welcome[member.guild.id]) return;  
    let values = welcomesetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
    var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
    if (!welcome) return;
    let channel = member.guild.channels.get(`${welcome[member.guild.id].nick}`);
    if (!channel) return;
  
            channel.send(`**Selamat Tinggal** ${member.tag} **Jangan Lupa untuk bekunjung lagi :* **`)+channel.send(new Discord.Attachment(await createCanvas()));
    }
});
bot.on("guildMemberAdd", async (member, client, message, args, level) => {  
            var namam = member.user.username
            var jadim = namam.length > 12 ? namam.substring(0, 10) + "..." : namam;
            async function createCanvas() {
            var imageUrlRegex = /\?size=2048$/g;

            var {body: background} = await superagent.get(`https://www.wallpapersbrowse.com/images/gd/gdevp6k.jpg`);
            var {body: avatar} = await superagent.get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));


            return new Canvas(856, 376)
              .addImage(avatar, 100, 50, 256, 256, 128)
      .setColor('#0d75ff')
              .setTextFont('50px System')
              .setTextAlign('center')
              .setTextFont('30px Arial')
              .addImage(background, 0, 0, 856, 376)
              .addText("Welcome", 260, 325)
              .addText(`${jadim}#${member.user.discriminator}`, 260, 355)
              .addRoundImage(avatar, 135, 10, 256, 256, 128)
              .toBufferAsync();
            }
  var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
 let welcomesetting = JSON.parse(fs.readFileSync("./welcomeonoff.json", "utf8"));
     if (!welcomesetting[member.guild.id]) {
    welcomesetting[member.guild.id] = {
     values: 1
      };
    }
    if(!welcome[member.guild.id]) return;  
    let values = welcomesetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
    var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
    if (!welcome) return;
    let channel = member.guild.channels.get(`${welcome[member.guild.id].nick}`);
    if (!channel) return;
  
            channel.send(`**Selamat Datang** ${member} **Di server** \`${member.guild.name}\`\n**Kamu member ke** \`${member.guild.memberCount}\``)+channel.send(new Discord.Attachment(await createCanvas()));
    }
});

bot.on('guildCreate', guild => {

  bot.channels.get(botStats.totalGuildsID).setName(`Total Guilds : ${bot.guilds.size}`);
  bot.channels.get(botStats.totalUsersID).setName(`Total Users : ${bot.guilds.reduce((a, g) => a + g.memberCount, 0)}`);
  bot.channels.get(botStats.totalChannelsID).setName(`Total Channels : ${bot.channels.size}`);
});

bot.on('guildDelete', guild => {

  bot.channels.get(botStats.totalGuildsID).setName(`Total Guilds : ${bot.guilds.size}`);
  bot.channels.get(botStats.totalUsersID).setName(`Total Users : ${bot.guilds.reduce((a, g) => a + g.memberCount, 0)}`);
  bot.channels.get(botStats.totalChannelsID).setName(`Total Channels : ${bot.channels.size}`);
});

bot.on("guildCreate", guild => {
    const liveJoin = bot.channels.get("552117728773668874"); //CHANGE TO YOUR CHANNEL-ID TO GET NOTIFICATIONS
    let liveJEmbed = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setTitle(`Your Bot Has Started Serving A Guild`)
    .setDescription(`**Guild Name**: ${guild.name}\n**Guild ID**: ${guild.id}\n**Members Gained**: ${guild.memberCount}`)
    liveJoin.send(liveJoin, liveJEmbed);
 });
 bot.on("guildDelete", guild => {
    const liveLeave = bot.channels.get("552117728773668874"); //CHANGE TO YOUR CHANNEL-ID TO GET NOTIFICATIONS
    let liveLEmbed = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setTitle(`Your Bot Has Stopped Serving A Guild`)
    .setDescription(`**Guild Name**: ${guild.name}\n**Guild ID**: ${guild.id}\n**Members Lost**: ${guild.memberCount}`)
    liveLeave.send(liveLeave, liveLEmbed);
 });


bot.on("message", async autoresponder => {
  var PREFIXES = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!PREFIXES[autoresponder.guild.id]) {
    PREFIXES[autoresponder.guild.id] = {
      PREFIXES: DEFAULTPREFIX
    };
  }

  var PREFIX = "-";

  if (autoresponder.author.bot) return;
  if (autoresponder.channel.type === "dm") return;

  let msg = autoresponder.content.toLowerCase();
  let sender = autoresponder.author;
  if (autoresponder.content.startsWith(PREFIX)) return;

  if (autoresponder.content === `<@${bot.user.id}>`) {
    return autoresponder.reply("My prefix is `" + PREFIX + "` \nneed help? type `" + PREFIX + "help`\nSupport Me!\nType `" + PREFIX + "invite` thanks.😊")
  }

  if (autoresponder.content === `<@!${bot.user.id}>`) {
    return autoresponder.reply("My prefix is `" + PREFIX + "` \nneed help? type `" + PREFIX + "help`\nSupport Me!\nType `" + PREFIX + "invite` thanks.😊")
  }

});



bot.login(process.env.TOKEN);
       