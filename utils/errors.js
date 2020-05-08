const Discord = require("discord.js");
const fs = require("fs");
let config = require("../botconfig.json");

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle("Insufficient Permission")
        .setColor(config.red)
        .addField("Permission needed", perm);

    message.channel.send(embed).then(m => m.delete(7000));
}

module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor(config.red)
        .setTitle("Error")
        .addField(`${user} has perms`, perms);

    message.channel.send(embed).then(m => m.delete(7000));

}

module.exports.botuser = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("You cannot ban a bot.")
        .setColor(config.red);

    message.channel.send(embed).then(m => m.delete(7000));
}

module.exports.cantfindUser = (message, channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("Could not find user.")
        .setColor(config.red);

    message.channel.send(embed).then(m => m.delete(7000));
}

module.exports.noReason = (message, channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("Please supply a reason.")
        .setColor(config.red);

    message.channel.send(embed).then(m => m.delete(7000));
}

module.exports.noTime = (message, channel) => {
  let embed = new Discord.RichEmbed() 
  .setTitle("Error") 
  .setDescription("Please specify a time.")
  .setColor(config.red);
  
  message.channel.send(embed).then(m => m.delete(7000));
}