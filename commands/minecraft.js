var Discord = require('discord.js');
var request = require('request');

exports.run = (client, message, args) => {

var request = require('request');
var mcCommand = '/minecraft'; // Command for triggering
var mcIP = `${args.join("")}`; // Your MC server IP
var mcPort = 25565; // Your MC server port

        var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return message.reply('Error getting Minecraft server status...');
            }
            body = JSON.parse(body);
            var status = `\`${args.join(" ")}\``;
            if(body.online) {
                status = `\`${args.join(" ")}\``;
                if(body.players.now) {
                    status - '**' + body.players.now + '** people are playing!';
                } else {
                    status - '*Nobody is playing!*';
                }
            }

           let embed = new Discord.RichEmbed()
           .setDescription(`Scanning Minecraft Server`)
           .setColor("RANDOM")
           .setFooter(`Published By ${message.author.tag}`, message.author.displayAvatarURL)
           .addField("**IP:**", `\`${mcIP}\``)
           .addField("**Port:**", `\`${mcPort}\``)
           .addField("**Players:**", `\`${body.players.now}/${body.players.max}\``, true)
           .addField("**Version:**", `\`${body.server.name}\``, true)
           .addField("**Motd:**", `\`${body.motd}\``, true)
           .setImage(`http://status.mclive.eu/${mcIP}/${mcIP}/25565/banner.png`);
            message.channel.send(embed);
        });
}

exports.conf = {
    aliases: ['mcserv'],
  name: "mcserver",
  description: "For Notify A Minecraft Server Status",
  usage: "mcserver [IP]",
    cooldown: "5"
}