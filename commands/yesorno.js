const superagent = require('superagent');
const Discord = require('discord.js');

module.exports.run = async (client, message, args, tools) => {
    let color = ''
      const { body } = await superagent
    .get('https://yesno.wtf/api/');
    if(body.answer === 'yes') color = '0x01DF01';
    if(body.answer === 'no') color = '0xFF0000';
  let postMsg = await message.channel.send('**Please Wait...**');
   message.channel.startTyping();
    const embed = new Discord.RichEmbed()
    .setColor(color)
    .setTimestamp() 
    .setImage(`${body.image}`)
    .setFooter(`Requested by: ${message.author.tag}`) 
     setTimeout(() => {
        postMsg.edit(`The magic API says: **${body.answer}**`, {embed})
        }, 2000);
message.channel.stopTyping(true);

}

module.exports.help = { 
name: "yesorno", 
description: "", 
usage: ""
} 