const Discord = require('discord.js');

module.exports = (x) => {
    const embed = new Discord.MessageEmbed()
        .setTitle(x.title)
        .setColor(x.color)
        .setDescription(x.description)
    return embed; 

};

        //.setTimestamp(x.updatedAt)

        //.setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
        /*
        * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
        */
                /*
        * Takes a Date object, defaults to current date.
        *//*
        * Inline fields may not display as inline if the thumbnail and/or image is too big.
        */
        /*
        * Blank field, useful to create some space. .addFields({ name: '\u200b', value: '\u200b' })
        */
       // max 25 of fields//

    
       // .setFooter(x.footer.text, x.footer.icon_url)
        //.setImage(x.image)
        //.setThumbnail(x.thumbnail)
        //.setURL(x.url)
        /*
        .addFields({ 
            name: x.name,
            value: x.value,
            inline: x.inline})
            */