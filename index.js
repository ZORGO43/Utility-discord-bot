const {REST} = require("@discordjs/rest")
const {Routes} = require("discord-api-types/v10")
const fs = require("fs")
const path = require("path")
const { Snake } = require('discord-gamecord');
const { Client,GatewayIntentBits,EmbedBuilder,Collection,MessageAttachment } = require('discord.js');



const TOKEN = 'YOUR_BOT_TOKEN';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
	],
});



////////////
const commands = [];
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands"); 
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}
client.on("ready", ()=>{
  const quild_ids = client.guilds.cache.map(guild => guild.id);
  const rest = new REST({version: "9"}).setToken(TOKEN)
  for(const guildId of quild_ids)
  {
      rest.put(Routes.applicationCommands("BOT_CLIENT_ID", guildId),{
          body: commands
      })
      .then(()=> console.log(`Added Commands to ${guildId}`))
      .catch(console.error)
  }
})
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
      await command.execute(interaction,client);
  } catch (error) {
      console.error(error);
      return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

///////////////


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence({ activities: [{ name: 'Devs' }] });

});

client.login(TOKEN);
