const Discord = require('discord.js')
const superagent = require('superagent');

module.exports.run = async (bot, message, args) => {
  let{body} = await superagent
  .get(`https://api-to.get-a.life/meme`);

  let postMsg = await message.channel.send('**🔍Please Wait...**');
   message.channel.startTyping();
  let me = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("lmao!")
  .setImage(body.url)
  .setTimestamp() 
  .setFooter(`Powered by: Meme`);
  setTimeout(() => {
        postMsg.edit(me) 
        }, 2000);
message.channel.stopTyping(true);
    }


module.exports.help = {
    name: 'meme', 
    aliases: ['memer'],
    ownerOnly: false,
    description: 'Sends you a meme!',
    usage: ''
}
