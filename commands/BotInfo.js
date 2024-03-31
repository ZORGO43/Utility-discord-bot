const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder} = require('@discordjs/builders');
const os = require("os");
const moment = require("moment");
const cpuStat = require("cpu-stat");



module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Crystal Wyvern Info')
            .setDescription('Crystal Wyvern Info'),

    async execute(interaction,client) {
        if (
            interaction.member.roles.cache.has("1047180959310684280") ||
            interaction.member.roles.cache.has("839178876298592306")
        ) {
            const clint = client;

            const days = Math.floor(clint.uptime / 86400000);
            const hours = Math.floor(clint.uptime / 3600000) % 24;
            const minutes = Math.floor(clint.uptime / 60000) % 60;
            const seconds = Math.floor(clint.uptime / 1000) % 60;
        
            cpuStat.usagePercent(function (error, percent) {
              if (error) return console.log(error);
        
              const node = process.version;
              const memoryUsage = formatBytes(process.memoryUsage().heapUsed);
              const CPU = percent.toFixed(2);
              const CPUModel = os.cpus()[0].model;
              const cores = os.cpus().length;
        
              const botinfoEmbed = new EmbedBuilder()
                .setAuthor({
                  name: "Bot info",
                  iconURL: client.user.displayAvatarURL({ dynamic: true }),
                })
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setFooter({
                  text: `Requested by ${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                })
                .setColor("Random")
                .addFields(
                  {
                    name: `**Bot Name:**`,
                    value: `${client.user.username}`,
                    inline: true,
                  },
                  { name: `**Bot ID:**`, value: `${client.user.id}`, inline: true },
                  { name: `\u200B`, value: `\u200B`, inline: true }, // We Will This As Empty So It Won't Look Messed Up In Embed
                  {
                    name: `**Bot Created At:**`,
                    value: `${moment.utc(client.user.createdAt).format("LLLL")}`,
                    inline: true,
                  },
                  {
                    name: `**Bot Joined At:**`,
                    value: `${moment.utc(client.joinedAt).format("LLLL")}`,
                    inline: true,
                  },
                  { name: `\u200B`, value: `\u200B`, inline: true }, // We Will This As Empty So It Won't Look Messed Up In Embed
                  {
                    name: `**Total Server(s):**`,
                    value: `${client.guilds.cache.size}`,
                    inline: true,
                  },
                  {
                    name: `**Total Members(s):**`,
                    value: `${client.users.cache.size}`,
                    inline: true,
                  },
                  {
                    name: `**Total Channels(s):**`,
                    value: `${client.channels.cache.size.toLocaleString()}`,
                    inline: true,
                  },
                  {
                    name: `**UpTime:**`,
                    value: `\`${days}\` Days \`${hours}\` Hours \`${minutes}\` Minutes \`${seconds}\` Seconds`,
                    inline: true,
                  },
                  {
                    name: `**Ping:**`,
                    value: `API Latecy: ${client.ws.ping}\nClient Ping: ${
                        interaction.createdTimestamp - interaction.createdTimestamp
                    }`,
                    inline: true,
                  },
                  { name: `\u200B`, value: `\u200B`, inline: true }, // We Will This As Empty So It Won't Look Messed Up In Embed
                  { name: `**NodeJS Version:**`, value: `${node}`, inline: true },
                  { name: `**Memory Usage:**`, value: `${memoryUsage}`, inline: true },
                  { name: `**CPU Usage:**`, value: `${CPU}`, inline: true },
                  { name: `**CPU Model:**`, value: `${CPUModel}`, inline: true },
                  { name: `**Cores:**`, value: `${cores}`, inline: true }
                );
                interaction.reply({ embeds: [botinfoEmbed] });
            });
        
            function formatBytes(a, b) {
              let c = 1024; // 1GB = 1024MB
              d = b || 2;
              e = ["B", "KB", "MB", "GB", "TB"];
              f = Math.floor(Math.log(a) / Math.log(c));
        
              return parseFloat((a / Math.pow(c, f)).toFixed(d)) + "" + e[f];
            }  
        }
    },
};