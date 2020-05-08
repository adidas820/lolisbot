const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
 if(!message.member.roles.some(r=>["Owner", "Admin", "Moderator", "CoLeader", "Mod", "Bot Developer", "sharif"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
  
  let nickname = args.join(' ')
  message.guild.members.get('456255626914299909')
  	.setNickname(nickname);
  await message.channel.send({
  	embed: new Discord.RichEmbed()

  		.setTitle(`Changed Server Nickname to ${nickname}`)
  })
} 
module.exports.help = { 
name: "setnick" 
} 
