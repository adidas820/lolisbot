var fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
let itemsJSON = JSON.parse(fs.readFileSync("./items.json", "utf8"));
const Discord = require("discord.js");
var currencyFormatter = require('currency-formatter');
var db = require('quick.db');
const itemsDB = new db.table('ITEMS');

exports.run = (client, message, args, ops) => { //Collecting info about command

  let items = [];
  var count = 0;

  db.fetch(`balance_${message.guild.id}_${message.author.id}`).then(balance => {
    if (balance == null) balance = 0;

    for (let i in itemsJSON) {
      items.push(itemsJSON[i]);
    }

    let notFound = new Discord.RichEmbed()
      .setColor(0xff2222)
      .setTitle("Error")
      .setDescription("Item not found")
      .setFooter(message.content);
    
    let noItem = new Discord.RichEmbed()
      .setColor(0xff2222)
      .setTitle("Error")
      .setDescription("You don\'t have this item")
      .setFooter(message.content);

    itemsDB.fetch(`${message.guild.id}_${message.author.id}`).then(amount => {

        for (var i in items) {
     
          if (items[i].name.split(" ").slice(1).toString().toLowerCase() === args[0].toLowerCase()) {
            var itemToBuy = items[i];
            var num = i;
            
            if (amount[num] <= 0) return message.channel.send(noItem);
            
            itemsDB.subtract(`${message.guild.id}_${message.author.id}`, 1, { "target": i });
            db.add(`balance_${message.guild.id}_${message.author.id}`, parseInt(items[i].price)).then(balanceUpdated => {
              message.channel.send({
                embed: {
                  "title": "Success",
                  "description": "You sold **" + itemToBuy.name + "** for **" + itemToBuy.price + "**\nMoney left: `" + currencyFormatter.format(balanceUpdated, {code: 'USD'}) + "`",
                  "color": 0x22ff22
                }
              });
            });
            count++;
          }
        }

        if (count === 0) return message.channel.send(notFound);
      });
  });

}