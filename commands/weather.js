const Discord = require("discord.js")
const weather = require("weather-js");

module.exports.run = (bot, message, args) => {
              
            const city = message.content.split(" ").slice(1).join(" ")
    if (!city) return message.channel.send("I need a city to check :wink:")

    weather.find({search: city, degreeType: 'C'}, function(err, result) {
        if (err) {
            message.channel.send("**${arg}** Isnt inside my query, please check again")
            console.log(err.stack)
            return;
        }
        let url;
        if (result[0].current.skytext === "Mostly Sunny") url = "https://openclipart.org/image/2400px/svg_to_png/3367/ivak-Decorative-Sun.png"
        else if (result[0].current.skytext === "Mostly Cloudy" || result[0].current.skytext === "Cloudy") url = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Weather-heavy-overcast.svg/200px-Weather-heavy-overcast.svg.png"
        else if (result[0].current.skytext === "Partly Cloudy") url = "";
  
        var embed = new Discord.RichEmbed()
        .setTitle(`Forecast for ${result[0].location.name}`, message.author.displayAvatarURL)
        .addField("Temperature", `**${result[0].current.temperature}ºC**`, true)
        .addField("Humidity", `**${result[0].current.humidity}%**`, true)
        .addField("Wind Speed", `**${result[0].current.windspeed.replace("mph", "ms/h")}**`, true)
        .addField("Feels Like", `**${result[0].current.feelslike}ºC**`, true)
        .addField("Status", `**${result[0].current.skytext}**`, true)
        .setTimestamp()
        .setThumbnail(result[0].current.imageUrl)
        .setColor('RANDOM')
        .setFooter(`Requested by: ${message.author.tag}`)
        message.channel.send({ embed: embed })
})};

module.exports.help = {
    name: 'weather',
};
