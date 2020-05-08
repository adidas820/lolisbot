const Discord = require('discord.js');

module.exports.run = (client, message, args, tools) => {

    const os = require('os');
    const arch = os.arch()
    const used = process.memoryUsage().heapUsed / 1024 / 1024;

    let totalSeconds = process.uptime();
    let realTotalSecs = Math.floor(totalSeconds % 60);
    let days = Math.floor((totalSeconds % 31536000) / 86400);
    let hours = Math.floor((totalSeconds / 3600) % 24);
    let mins = Math.floor((totalSeconds / 60) % 60);
  
   const embed = new Discord.RichEmbed();
    embed.setColor('RANDOM')
    embed.addField('Minasaki has been online for:', `**${days}** Days, **${hours}** Hours, **${mins}** Minutes And **${realTotalSecs}** Seconds!`)
  message.channel.send(embed);
  
}

module.exports.help = { 
name: "uptime", 
description: "", 
usage: ""
} 