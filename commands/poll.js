const Discord = require('discord.js');

module.exports.run = async (bot, message, args, ops, PREFIX) => {
  
  if (!args[0]) return message.channel.send(`Proper usage: ${PREFIX}poll <question>`); 
  
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM') 
  .setFooter('React to vote') 
  .setDescription(args.join(' ')) 
  .setTitle(`Poll created by ${message.author.username}`);
  
  let msg = await message.channel.send(embed);
  
  await msg.react('✅');
  await msg.react('⛔');
  
  message.delete({timeout: 1000});
  
} 