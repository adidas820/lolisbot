const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send("Call or tag someone!")
  const pat = await neko.getSFWPat();
  const answers = [
    `Look at **${args.join(" ")}**!`,
    `${message.author} and **${args.join(" ")}** looks cute together!`,
    `Pat pat!`,
    `There you go, **${args.join(" ")}**`,
    `**${args.join(" ")}**, ${message.author} just pat you!`
  ];
  const katakata = answers[Math.floor(Math.random() * answers.length)];
  let postMsg = await message.channel.send('**Please Wait...**');
   message.channel.startTyping();
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM") 
    .setDescription(`${katakata}`)
    .setImage(pat.url)
    .setFooter(`Requested by: ${message.author.tag}`);
  setTimeout(() => {
        postMsg.edit(embed)
        }, 2000);
message.channel.stopTyping(true);
};

module.exports.help = { 
name: "pat", 
description: "", 
usage: ""
} 