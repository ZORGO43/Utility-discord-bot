const { SlashCommandBuilder} = require('@discordjs/builders');
const {AttachmentBuilder} =  require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('sayfile')
        .setDescription('Message to a Channel')
            .setDescription('Sent Message to a channel')
            .addChannelOption(option => option.setName('channel').setDescription('Channel ID').setRequired(true))
            .addStringOption(option => option.setName('message').setDescription('Message').setRequired(true))
            .addStringOption(option => option.setName('file').setDescription('File Link').setRequired(true)),

    async execute(interaction, client) {
        if (    
            interaction.member.roles.cache.has("1047180959310684280") ||
            interaction.member.roles.cache.has("839178876298592306")
        ) {
            let channel = interaction.options.getChannel('channel');
            let logch = await client.channels.fetch("1153706450313556081");
            const userName = interaction.user.username;
            let message = interaction.options.getString('message');      
            let Sf = interaction.options.getString('file');
            const file = new AttachmentBuilder(Sf);
                channel.send({content : message, files: [file] })
                logch.send(`Say File Command Used By ${userName}`);
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




