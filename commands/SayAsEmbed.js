const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Sent Embed to a Channel')
        .addChannelOption(option => option.setName('channel').setDescription('Channel').setRequired(true))
        .addStringOption(option => option.setName('title').setDescription('Title of te Embed').setRequired(true))
        .addStringOption(option => option.setName('description').setDescription('Description of the Embed').setRequired(true))
        //.addStringOption(option => option.setName('message').setDescription('Message').setRequired(true))
        .addStringOption(option => option.setName('mention').setDescription('Mention Everyone').setRequired(true)
        .addChoices(
					{ name: 'Yes', value: 'Yes' },
					{ name: 'No', value: 'No' },
				)),

    async execute(interaction, client) {
        if (
            interaction.member.roles.cache.has("1047180959310684280") ||
            interaction.member.roles.cache.has("839178876298592306")
        ) {
            let channel = interaction.options.getChannel('channel');
            let logch = await client.channels.fetch("1153706450313556081");
            const userName = interaction.user.username;
           // let message = interaction.options.getString('message');
            let calle = interaction.options.getString('mention');
            let title = interaction.options.getString('title');
            let desc = interaction.options.getString('description');


            const embed = new EmbedBuilder()
                .setColor("#FFFF00")
                .setTimestamp(Date.now())
                .setTitle(title)
                .setDescription(desc)
                .setThumbnail("https://cdn.discordapp.com/attachments/848543781899993088/994618531268276295/20220615_071901.png")
                .setFooter({ text: 'Crystal Wyvern', iconURL: 'https://cdn.discordapp.com/attachments/848543781899993088/994618531268276295/20220615_071901.png' });

            if (calle === 'Yes' ){
                await channel.send({
                    content: `@everyone`,
                    embeds: [embed]
                })
                logch.send(`Say Embed Command Used By ${userName}`);;
            }
            else{
                await channel.send({
                    embeds: [embed]
                })
                logch.send(`Say Embed Command Used By ${userName}`);;

            }


            

       

            try {
                await interaction.reply("Done")
            } catch (e) {

                console.log(e);
            }
        } else {
            interaction.reply({
                content: 'You dont have permission to use this command!',
                ephemeral: true
            });

            return;
        }
    },
};




