const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'dab',
    description: 'Things related to Draw a Box.',
    options: [
        {
            name: 'info',
            description: 'Draw a Box information.',
            type: 1
        },
        {
            name: "exercises",
            description: "Draw a Box exercise options.",
            type: 1,
            options: [{
                name: "options",
                description: "DaB Options",
                type: 3,
                required: true,
                choices: [{
                    name: "Short Exercises",
                    value: "short"
                },{
                    name: "Long Exercises",
                    value: "long"
                }]
            }]
        }
    ],
	async execute(interaction) {
        if (interaction.options._subcommand === 'info'){
            let embed = new MessageEmbed()
                .setColor('#0B99443')
                .setTitle('Draw a Box')
                .setDescription("Draw a Box is a highly recommended course for a few simple reasons:")
                .setThumbnail('https://d15v304a6xpq4b.cloudfront.net/assets/images/drawabox-logo.png')
                .setURL('https://drawabox.com/')
                .addFields(
                    { name: 'It\'s efficient.', 
                        value: 'DaB is meant to teach you 3D spatial awareness and line quality in the fastest manner possible.', 
                        inline: true },
                    { name: 'It\'s free.', 
                        value: 'No pirating or subscriptions needed.  All the content is free in written and video/audio format.', 
                        inline: true },
                )
                .setTimestamp()
                .setFooter(interaction.guild.name, interaction.guild.iconURL());
    
            await interaction.reply({ embeds: [embed]  });
        };

        if (interaction.options._subcommand === 'exercises'){
            const string = interaction.options._hoistedOptions[0].value;

            function getRandom() {
                return Math.floor(Math.random() * (11 - 1) + 1);
            }

            function getDAB(){
                let num = getRandom();
                console.log(num)

                switch(num){
                    case 1: return thing = {'description':'Superimposed Lines','link':'https://drawabox.com/lesson/1/superimposedlines'}
                    case 2: return thing = {'description':'Ghosted Lines','link':'https://drawabox.com/lesson/1/ghostedlines'}
                    case 3: return thing = {'description':'Ghosted Planes','link':'https://drawabox.com/lesson/1/ghostedplanes'}
                    case 4: return thing = {'description':'Table of Elipses','link':'https://drawabox.com/lesson/1/tablesofellipses'}
                    case 5: return thing = {'description':'Elipses in Planes','link':'https://drawabox.com/lesson/1/ellipsesinplanes'}
                    case 6: return thing = {'description':'Funnels','link':'https://drawabox.com/lesson/1/funnels'}
                    case 7: return thing = {'description':'Plotted Perspective','link':'https://drawabox.com/lesson/1/plottedperspective'}
                    case 8: return thing = {'description':'Rough Perspective','link':'https://drawabox.com/lesson/1/roughperspective'}
                    case 9: return thing = {'description':'Rotated Boxes','link':'https://drawabox.com/lesson/1/rotatedboxes'}
                    case 10: return thing = {'description':'Organic Perspective','link':'https://drawabox.com/lesson/1/organicperspective'} 
                }
            }


            if(string === 'long'){
                let embed = new MessageEmbed()
                .setColor('#0B99443')
                .setTitle('Draw a Box Exercises (Long)')
                .setDescription('Here are 3 random excersies from Lesson 1 of DAB. \n \n Do each for 20-30 minutes.')
                .setThumbnail('https://d15v304a6xpq4b.cloudfront.net/assets/images/drawabox-logo.png')
                .setURL('https://drawabox.com/')
                .setTimestamp()
                .setFooter(interaction.guild.name, interaction.guild.iconURL());

                for (let i=1; i<4;i++){
                    let dab = getDAB();

                    embed
                    .addField(`Exercise ${i}:`, `[${dab.description}](${dab.link})`, false)
                }
    
                await interaction.reply({ embeds: [embed]  });
    
            };
            if(string === 'short'){
                let embed = new MessageEmbed()
                .setColor('#0B99443')
                .setTitle('Draw a Box Exercises (Short)')
                .setDescription('Here are 3 random excersies from Lesson 1 of DAB. \n \n Do each for 10-15 minutes.')
                .setThumbnail('https://d15v304a6xpq4b.cloudfront.net/assets/images/drawabox-logo.png')
                .setURL('https://drawabox.com/')
                .setTimestamp()
                .setFooter(interaction.guild.name, interaction.guild.iconURL());

                for (let i=1; i<4;i++){
                    let dab = getDAB();

                    embed
                    .addField(`Exercise ${i}:`, `[${dab.description}](${dab.link})`, false)
                }
    
                await interaction.reply({ embeds: [embed]  });
    
            };
        };
	},
};