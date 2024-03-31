const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('warning')
        .addUserOption(option => option.setName('user').setDescription('The user to be called').setRequired(true))
        .addStringOption(option => option.setName('time').setDescription('The Time user should report to voice').setRequired(false)),
    async execute(interaction, client) {
        if (
            interaction.member.roles.cache.has("AUTH_ROLE")
        ) {
            let callUser = interaction.options.getMember('user');

            let time = interaction.options.getString('time');


            let notifychannel = await client.channels.fetch("WARN_CHANNEL");
            let logch = await client.channels.fetch("LOG_CHANNEL");
            const userName = interaction.user.username;
            callEmbed = new MessageEmbed()
                .setTitle("SERVER ADMIN")


                .setDescription(`${callUser} Come to [waiting](https://discord.gg/ and speak with Leader Or Co-Leader \n`)

                .setColor("#f58742")
                .setFooter(
                    `SERVER`,
                    "https://cdn.discordapp.com/attachments/YOUR_LOGO"
                )
                .setTimestamp();
            if (time) {
                callEmbed.addField("Reason", time)
            }



            try {
                await interaction.reply({
                    embeds: [callEmbed]
                })
                await notifychannel.send({
                    content: `${callUser} `,
                    embeds: [callEmbed]
                })
                logch.send(`Warn Command Used By ${userName}`);;

                console.log(`warning call from   ${interaction.user.username} to ${callUser} `);
                if (callUser) {
                    callUser.send({
                        content: ` ${callUser} Come to Speak with Admins ${time ? time : " "} \n https://discord.gg/`
                    });
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            interaction.reply({
                content: 'Get Out ',
                ephemeral: true
            });

            return;
        }



    },
};



