var fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
let itemsJSON = JSON.parse(fs.readFileSync("./items.json", "utf8"));
const Discord = require("discord.js");
var currencyFormatter = require('currency-formatter');
var db = require('quick.db');
const itemsDB = new db.table('ITEMS');

exports.run = (client, message, args, ops) => { //Collecting info about command

  let items = [];
  var data = [];
  var count = 0;

  db.fetch(`balance_${message.guild.id}_${message.author.id}`).then(balance => {
    if (balance == null) balance = 0;

    for (let i in itemsJSON) {
      items.push(itemsJSON[i]);
      data[i] = 0;
    }

    let store = new Discord.RichEmbed()
      .setAuthor(`Store`, `http://heartsforthelost.com/wp-content/uploads/2012/07/Christian-Store-Icon.png`)
      .setColor(`RED`)
      .setFooter(`Balance: ${currencyFormatter.format(balance, { code: 'USD' })} | ${message.content}`);

    let notFound = new Discord.RichEmbed()
      .setColor(0xff2222)
      .setTitle("Error")
      .setDescription("Item not found")
      .setFooter(message.content);
    
    let noMoney = new Discord.RichEmbed()
      .setColor(0xff2222)
      .setTitle("Error")
      .setDescription("You don\'t have enough money")
      .setFooter(message.content);

    itemsDB.fetch(`${message.guild.id}_${message.author.id}`).then(amount => {

      for (let item in items) {
        if (amount == null || amount == undefined) itemsDB.set(`${message.guild.id}_${message.author.id}`, data);
        store.addField(items[item].name, items[item].description + "\nPrice: **" + currencyFormatter.format(items[item].price, {
          code: 'USD'
        }) + "**" + "\n*Amount: " + amount[item] + "*", false)
      }

      if (args.length == 0) {
        return message.channel.send(store)
      } else

      {
        for (var i in items) {
     
          if (items[i].name.split(" ").slice(1).toString().toLowerCase() === args[0].toLowerCase()) {
            var itemToBuy = items[i];
            
            if (balance - itemToBuy.price < 0) return message.channel.send(noMoney);
            
            itemsDB.add(`${message.guild.id}_${message.author.id}`, 1, { "target": i });
            db.subtract(`balance_${message.guild.id}_${message.author.id}`, parseInt(items[i].price)).then(balanceUpdated => {
              message.channel.send({
                embed: {
                  "title": "Success",
                  "description": "You bought **" + itemToBuy.name + "** for **" + itemToBuy.price + "**\nMoney left: `" + currencyFormatter.format(balanceUpdated, {code: 'USD'}) + "`",
                  "color": 0x22ff22
                }
              });
            });
            count++;
          }
        }

        if (count === 0) return message.channel.send(notFound);
      }

    });
  });

}