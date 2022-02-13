const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'critique',
    description: 'Critique Guide',
    userPermissions: ['MANAGE_ROLES'],
    options: [{
        name: 'destination',
        description: 'Select a Channel',
        type: 7
    }],
	async execute(interaction) {
        const critEmbed = new MessageEmbed()
            .setColor('#0B99443')
            .setTitle('Guide to Asking for Critique')
            .setDescription("Please remember that critiques are not guaranteed and are given when community members have the time to do so. Please do the following to facilitate the process.")
            .addFields(
                { name: "1. Post a full image of your piece.", 
                    value: "If this is linked, be sure that the link leads directly to the art that you want critique on. Posting a small, cropped screenshot often divorces the section from the greater context of the piece that can help your critiquer give you accurate advice.", 
                    inline: false },
                { name: "2. Be specific about what you want help with.",
                    value: "Sometimes you might not know what specifically you need help with and that's ok. Below is a list of potential options. \n \n **List of fundamentals:** \n _Anatomy_ \n _Pose_ \n _Perspective_ \n _Composition_ \n _Color_ \n _Lighting/Shading_ \n _Color Theory_ \n _Character/Creature/Clothing Design_ \n _Background Elements._ \n \n We may not have anyone in here that can help you directly, but by knowing what you actually want help with we can at least give you some resources to do more independent studies. Use <#693550534929416272> if you need help finding something that isn't already here.", 
                    inline: false },
                { name: "3. Share the type(s) of art you would like yours to look like.", 
                    value: "Similar to the above, the advice that is relevant will depend on what outcome you're trying to achieve. While fundamentals can be very important (knowing the rules helps you break them consistently) some will be more important than others. Example: if you only want to draw cars, it wouldn't make sense to learn head construction.", 
                    inline: false },
                { name: "4. Be patient.", 
                    value: "Again, as these critiques are free, there is no real incentive for anyone to help. You may have finished your piece by the time someone gets to critiquing it. Following the above steps ought to get you crit sooner, but this isn't guaranteed. That said, entitlement and impatience will get you ignored more often than not. Do not repeatedly @ people if they have not replied unless you have their permission or have established rapport.", 
                    inline: false },
            )
            .setTimestamp()
            .setFooter(interaction.guild.name, interaction.guild.iconURL());

        const channel = interaction.options.getChannel('destination');

        if (channel){
            channel.send({ embeds: [critEmbed]  });
            await interaction.reply({ content: "Critique Guide sent"});
        } 
        else {
            await interaction.reply({ embeds: [critEmbed]  });}

	
	},
};