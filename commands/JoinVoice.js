const { joinVoiceChannel } = require('@discordjs/voice');
const { SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jvc')
        .setDescription('Join VC')
            .setDescription('Join VC')
            .addChannelOption(option => option.setName('channel').setDescription('Channel').setRequired(true)),

    async execute(interaction,client) {
        if (
            interaction.member.roles.cache.has("1047180959310684280") ||
            interaction.member.roles.cache.has("839178876298592306")
        ) {
            let channel = interaction.options.getChannel('channel');
            let logch = await client.channels.fetch("1153706450313556081");
            const jvc = joinVoiceChannel({
                channelId: channel.id, 
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            
            try {
                await interaction.reply("Done")
                logch.send(`Join VC  Command Used By ${userName}`);
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