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
            interaction.member.roles.cache.has("AUTH_ROLE_ID") ||
            interaction.member.roles.cache.has("AUTH_ROLE_ID")
        ) {
            let channel = interaction.options.getChannel('channel');
            let logch = await client.channels.fetch("LOG_CHANNEL");
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
