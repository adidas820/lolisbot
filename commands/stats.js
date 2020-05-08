const Discord = require("discord.js");
const run = module.exports.run = async (client, msg, args) => {
    const os = require('os');
    const arch = os.arch()
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
  
    let totalSeconds = process.uptime();
    let realTotalSecs = Math.floor(totalSeconds % 60);
    let days = Math.floor((totalSeconds % 31536000) / 86400);
    let hours = Math.floor((totalSeconds / 3600) % 24);
    let mins = Math.floor((totalSeconds / 60) % 60);
    var cpu = process.cpuUsage().system / 1024 / 1024;
    var cpu_usage = Math.round(cpu * 100) / 100;
    
    let postMsg = await msg.channel.send("**Please Wait...**");
    let info = new Discord.RichEmbed()
        .setColor('RANDOM') 
        .setDescription('**Loli Stats**')
        .addField('📂 Total Servers', `**${client.guilds.size}** guilds.`)
        .addField('📡 Total Channels', `**${client.channels.size}** channels.`)
        .addField('👥 Total Users', `**${client.users.size}** other users.`)
        .addField('💾 Memory usage', `${Math.round(used * 100) / 100}MB`) 
        .addField('<:nodejs:446922023529086976> Node', `${process.version}`) 
        .addField('<:nodejs:446922023529086976> Library', 'discord.js')
        .addField('💻 Operating System', `${os.platform} ${arch}`) 
        .addField('💽 CPU usage', `${cpu_usage}% Used`) 
        .addField('⏲️ Uptime', `Days: ${days} | Hours: ${hours} | Minutes: ${mins} | Seconds: ${realTotalSecs}`)
        .addField('🕹️ Ping', `${client.ping.toFixed(2)}ms`) 
        .setFooter('© Adi820')

         setTimeout(() => {
         postMsg.edit(info)
          }, 1000);
} 

module.exports.help = {
    name: 'stats', 
    aliases: ['servers'],
    ownerOnly: false,
    description: 'bot server info',
    usage: ''
}
