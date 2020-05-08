const Discord = require("discord.js");

module.exports.run = async (bot, message, args, ops, PREFIX) => {

  if(args[0] == "help"){ message.reply(`Usage: \`${PREFIX}ask <questions>\``);
return;
                       }
  message.channel.startTyping();

if(!args[2]) return message.reply(`\`\`\`Please Ask The Many Questions\n Example: ${PREFIX}ask your owner always online?\`\`\``);

let replies = ["It is decidedly so", "Without a doubt", "Yes, definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful", "Maybe?", "no", "Very Likely", "Probably No", "😇Only Good Knows.", "🙄hmmm...", "😆, What is your question?", "🤔Don\'t see what happening!"];

let postMsg = await message.channel.send('**Please Wait...**');

let result = Math.floor((Math.random() * replies.length));

let questions = args.join(" ");

let ballembed = new Discord.RichEmbed() 
.setAuthor(message.author.tag) 
.setColor('RANDOM') 
.addField("❓Question", questions)
.addField("📝Answer", replies[result])
.setFooter(`Requested by: ${message.author.tag}`);

setTimeout(() => {
postMsg.edit(ballembed)
}, 2000);
	message.channel.stopTyping(true);
}

module.exports.help = { 
name: "8ball", 
description: "ask shometing and bot will answer it", 
usage: "m!ask <message>"
} 