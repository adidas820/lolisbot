const Discord = require('discord.js');
const db = require('quick.db');
var currencyFormatter = require('currency-formatter'); //For currency
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = async (client, message, args) => { //Collecting info about command
  let member = message.mentions.members.first();
  if (!member) member = message.member;

  db.fetch(`balance_${member.guild.id}_${member.id}`).then(balance => {
  
  if (balance == null) {
    db.set(`balance_${member.guild.id}_${member.id}`, 50); 
    balance = 50;
  }

  var embed = new Discord.RichEmbed()
    .setColor(0x6EFFE4)
    .setTitle("Balance")
    .setDescription("**$" + balance + "**");

  message.channel.send(embed).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
    
  });
}