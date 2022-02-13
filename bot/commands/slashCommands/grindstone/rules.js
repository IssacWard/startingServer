const { MessageEmbed, Channel } = require('discord.js');

module.exports = {
	name: 'rules',
    description: 'Server Rules',
    userPermissions: ['MANAGE_ROLES'],
    options: [{
        name: 'destination',
        description: 'Select a Channel',
        type: 7
    }],
	async execute(interaction) {
        const ruleEmbed = new MessageEmbed()
            .setColor('#0B99443')
            .setTitle('General Server Rules')
            .addFields(
                { name: "1. Please keep chatter to the general channel.", 
                    value: "We understand that conversations will sometimes get off topic as people will banter about random things. However, we want to keep this server as work-centric as possible. If something you want to post something that is not directly related to work, consider whether it’s related or at least useful to others.", 
                    inline: false },
                { name: "2. You are not allowed to critique if you are not posting art.", 
                    value: "We have had far too many occasions where someone will critique others and pretend to be an expert.  It oftenly is not done with good intentions and instead done to inflate their own ego.", 
                    inline: false },
                { name: "3. Don't be an asshole.",
                    value: " It’s fine to be blunt and to openly disagree. We welcome debate and confrontation about art and technique issues. However, don’t troll just for the sake of it. If you're going to give critique, please be constructive. No need to be insulting or mean.", 
                    inline: false },
                { name: "4. Take it to DMs.", 
                    value: " If you have a personal problem with another member, please take it to DMs and try to resolve it privately. If the problem persists and pertains to this server, DM one of the moderators.", 
                    inline: false },
                { name: "5. General critiques ARE ALLOWED in ALL CHANNELS.", 
                    value: " Please note this before you post. If you complain about receiving critique you asked for, you will be removed. If you do not want critique on a specific piece, please state so when you post in any art gallery channel that is not <#582696758006513692>.  If you want specific help or in-depth assistance, please post in <#582696758006513692>.", 
                    inline: false },
                { name: "6. No conversation in resource channels.", 
                    value: "Please do not post chatter or commentary in the tutorial/resource channels. We want to keep the channels as clutter-free as possible. If you want to discuss a particular thing from a tutorial/resource channel, mention it in <#582699041855504395> or <#693550534929416272>", 
                    inline: false },
            )
            .setTimestamp()
            .setFooter(interaction.guild.name, interaction.guild.iconURL());

            const guidelinesEmbed = new MessageEmbed()
            .setColor('#0B99443')
            .setTitle('General Server Guidelines / Misc Information')
            .addFields(
                { name: "1. This is a work server.", 
                    value: "If you are easily upset by people disagreeing or speaking bluntly, you don't belong here. This is a critique and work server. If you cannot handle being critiqued directly and thoroughly, please leave now. Once again, if you complain about receiving critique you asked for, you will be removed as of rule 4.", 
                    inline: false },
                { name: "2. Yes, you can invite others.", 
                    value: "Grindstone is open for anyone who wishes to improve.  Please use the link provided in <#596434932700676258>. ", 
                    inline: false },
                { name: "3. No Noah Bradley Zone.", 
                    value: "Without going into details, do not promote him in Grindstone.  There is no punishment for posting his site/refs/etc, but those links will be deleted without warning.", 
                    inline: false },
                { name: "4. 'Nope' role.", 
                    value: "The Nope role exists for users who have proven themselves incapable of interacting with the community for various reasons (as determined by the mod team). This role is used instead of outright kicking/banning problematic users so that they are still able to access to the vast resource libraries here. \n \n If you feel you have been unfairly <@&699485058548891739> roled you are free to DM a moderator with an appeal. You must wait a minimum of 1 month since the Nope role was applied to you before appealing. Do not bother Kyt with these appeals. If you do, you will be barred from ever appealing again or just straight up banned. ", 
                    inline: false },
                { name: "5. Unsolicited DMs.", 
                    value: "Please let the moderators know if you recieve an unsolicited DM/are being bothered by a Grindstone member, especially if they have the <@&699485058548891739> role.  Sending unsolicited DMs to Grindstone members is a way to circumvent the role's restrictions, which is grounds to revoke their access from the entire server.", 
                    inline: false }
            )
            .setTimestamp()
            .setFooter(interaction.guild.name, interaction.guild.iconURL());

        const channel = interaction.options.getChannel('destination');

        if (channel){
            channel.send({ embeds: [ruleEmbed] });
            channel.send({ embeds: [guidelinesEmbed] });
            await interaction.reply({ content: "Rules sent"});
        } 
        else {
            await interaction.reply({ embeds: [ruleEmbed, guidelinesEmbed] });}

    
	},
};