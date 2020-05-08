const Discord = require("discord.js");

module.exports.run = async (bot, message, args, ops, PREFIX) => {
  
  let postMsg = await message.channel.send("**Please Wait...**");
  if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) return;
  message.channel.createInvite({maxAge: 0}).then(invite => {
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`**Permanent Invite Link**: ${invite}`)
    .setFooter(`Requested by: ${message.author.tag}`);
    setTimeout(() => {
postMsg.edit(embed)
}, 1000);
  });
}

exports.help = {
  name: 'createinvite',
}
