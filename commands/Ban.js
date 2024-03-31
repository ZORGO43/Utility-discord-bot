const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('gangban')
        .setDescription('BAN PLAYER')
        .addSubcommand(subcommand =>
            subcommand
            .setName('temporary')
            .setDescription('Temporary ban')
            .addUserOption(option => option.setName('player').setDescription('The user to be banned').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('Reason for ban').setRequired(true))
            .addIntegerOption(option => option.setName('days').setDescription('Number of days of ban').setRequired(true)))

        .addSubcommand(subcommand =>
            subcommand
            .setName('permanent')
            .setDescription('Permanent Ban')
            .addUserOption(option => option.setName('player').setDescription('The user to be banned').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('Reason for ban').setRequired(true))),

    async execute(interaction, client) {
        if (
            interaction.member.roles.cache.has("850708733831282688")
        ) {
            let callUser = interaction.options.getMember('player');

            let reason = interaction.options.getString('reason');
            let days = interaction.options.getInteger('days');
            let bantype = interaction.options.getSubcommand();
            let callEmbed;


            let notifychannel = await client.channels.fetch("1027536215290941511");
            let logch = await client.channels.fetch("1153706450313556081");

            const userName = interaction.user.username;
            console.log(bantype)
            if (bantype == "temporary") {
                 callEmbed = new MessageEmbed()
                    .setTitle("KOTTARATHIL ADMIN")

                    .setDescription(
                        `${callUser} ** You have been banned from the server** `
                    )
                    .addField("Reason", reason,true)
                    .addField("Ban Period ", `${days.toString()} day`, true)
                    .addField("Return Period ", `<t:${epoch(days)}:R>`, true)
                    .setColor("#ff0000")
                    // .setThumbnail("https://media.discordapp.net/attachments/695670539078860830/909862759427100702/MRP_BANNED.gif")
                    .setFooter(
                        `KOTTARATHIL`,
                        "https://cdn.discordapp.com/attachments/873754598454722661/1025973983180505098/logo.png"
                    )
                    .setTimestamp();
            } else {
                callEmbed = new MessageEmbed()
                    .setTitle("KOTTARATHIL ADMIN")

                    .setDescription(
                        `${callUser} ** You have been banned from the server** `
                    )
                    .addField("Reason", reason)
                    .addField("Period ", `permanent`)
                    .setColor("#ff0000")
                    .setFooter(
                        `KOTTARATHIL`,
                        "https://cdn.discordapp.com/attachments/873754598454722661/1025973983180505098/logo.png"
                    )
                        // .setThumbnail("https://media.discordapp.net/attachments/695670539078860830/909862759427100702/MRP_BANNED.gif")
                    .setTimestamp();

            }

            try {
                await interaction.reply({
                    embeds: [callEmbed]
                })
                await notifychannel.send({
                    content: `${callUser}`,
                    embeds: [callEmbed]
                })
                    logch.send(`Ban Command Used By ${userName}`);

		// callUser.roles.add("828376501257764875");
        console.log("ban  from " + interaction.user.username +" to "+ callUser.user.username );
        callUser.send({
            content: `${callUser}`,
            embeds: [callEmbed]
        });


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

function epoch(day) {

    const date = new Date();
    date.setDate(date.getDate() + day);
    return (Math.trunc(date.getTime() / 1000))
}


