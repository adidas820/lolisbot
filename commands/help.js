const Discord = require('discord.js');

module.exports.run = async (bot, message, args, ops, PREFIX) => {

let embed = new Discord.RichEmbed()
.setColor('FF0000')
.setTitle('List of all commands') 
.addField('General Commands', '\`help\` \`helphere\` \`botinfo\` \`bug\` \`userinfo\` \`serverinfo\` \`stats\` \`ping\` \`report\` \`invite\`')
.addField('Music', '\`play\` \`pause\` \`resume\` \`skip\` \`stop\` \`np\` \`queue\` \`volume\`')
.addField('Image', '\`slap\` \`avatar\` \`yesorno\` \`meme\` \`bunny\` \`kiss\` \`hug\` \`gif\` \`pat\`')
.addField('Utility and Fun', '\`hastebin\` \`calculator\` \`rps\` \`discrim\` \`fmk\` \`asciify\` \`embed\` \`emojify\` \`ask\` \`say\` \`weather\`')
.addField('Moderation', '\`ban\` \`kick\` \`mute\` \`unmute\` \`warn\` \`esay\` \`purge\`')
.setFooter('© Adi820');
message.author.send(embed);

message.channel.send(`${message.author}, 📬 Sending help to your DM! If you don't have any Dm's from me please do ${PREFIX}helphere`);

 }; 

module.exports.help = {
name: 'help'
}
