const Discord = require("discord.js");
const DEFAULTPREFIX = "m!";
const fs = require("fs")
module.exports.run = async (bot, message, args, PREFIX) => {
           var newprefix = args.join(" ")
           if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(":x: NO NO NO | ``MANAGE SERVER`` PERMISSIONS NEEDED!")
           if (!newprefix) return message.channel.send(`:x: **Usage :** ${PREFIX}setprefix <new prefix>`)
           if (newprefix.match("reset")) {
            var PREFIXES = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

            PREFIXES[message.guild.id] = {
                PREFIXES: DEFAULTPREFIX
            };
            fs.writeFile("./prefixes.json", JSON.stringify(PREFIXES), (err) => {
                if (err) console.log(err)
            });
            var embed = new Discord.RichEmbed()
            .setTitle(`Reset prefix to \`${DEFAULTPREFIX}\``)
            .setColor("RANDOM")
            message.channel.send(embed)
            return;
           }

           var PREFIXES = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

           PREFIXES[message.guild.id] = {
               PREFIXES: newprefix
           };

           fs.writeFile("./prefixes.json", JSON.stringify(PREFIXES), (err) => {
               if (err) console.log(err)
           });

           var embed = new Discord.RichEmbed()
           .setTitle(`Set prefix to \`${newprefix}\``)
           .setColor("RANDOM")
           message.channel.send(embed)
} 

module.exports.help = { 
name: "setprefix" 
} 
