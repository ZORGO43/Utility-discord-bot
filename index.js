const {REST} = require("@discordjs/rest")
const {Routes} = require("discord-api-types/v10")
const fs = require("fs")
const path = require("path")
const { Snake } = require('discord-gamecord');
const { Client,GatewayIntentBits,EmbedBuilder,Collection,MessageAttachment } = require('discord.js');



const TOKEN = 'ODY0MzY3MTU5NzM0Njk3OTg0.YO0apg.zSH5C11Sm3ZSSSq9o7pGBtO2z6Y';

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
      rest.put(Routes.applicationCommands("864367159734697984", guildId),{
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


client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', member => {
    member.roles.add(member.guild.roles.cache.find(i => i.name === 'KVA GUEST'))

    const welcomeEmbed = new Discord.MessageEmbed()

    welcomeEmbed.setColor('#5cf000')
    welcomeEmbed.setTitle('**' + member.user.username + '** is TESTX other **' + member.guild.memberCount + '** people')
    welcomeEmbed.setImage('https://media.discordapp.net/attachments/816726929477992459/1153666869962756096/360_F_562024161_tGM4lFlnO0OczLYHFFuNNdMUTG9ekHxb.jpg?ex=660bf7ff&is=65f982ff&hm=bb81d44ffab27095c75c29c1bf58da27f15c573868ab226db9b94ec96e060288&=&format=webp&width=525&height=350')

    member.guild.channels.cache.find(i => i.name === 'zz').send(welcomeEmbed)
})

// client.on('guildMemberRemove', member => {
//     const goodbyeEmbed = new Discord.MessageEmbed()

//     goodbyeEmbed.setColor('#f00000')
//     goodbyeEmbed.setTitle('**' + member.user.username + '** was not the impostor there are **' + member.guild.memberCount + '** left Among Us')
//     goodbyeEmbed.setImage('https://gamewith-en.akamaized.net/article/thumbnail/rectangle/22183.png')

//     member.guild.channels.cache.find(i => i.name === 'greetings').send(goodbyeEmbed)
// })



client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence({ activities: [{ name: 'Devs' }] });

    // setInterval(() => {
    //     num = Math.floor(Math.random() * 6) + 1;
    //   //   targetGuild = client.guilds.cache.get("617320209291935764");
    
    //     if (num == 1) {
    //       client.user.setPresence({ activities: [{ name: 'with discord.js' }] });
    //     }
    //     if (num == 2) {
    //       client.user.setPresence(`With Kotta Ghost`, { type: "PLAYING" });
    //     }
    //     if (num == 3) {
    //       client.user.setPresence(`Duke SAS`, { type: "WATCHING" });
  
    //     }
    //     if (num == 4) {
    //       client.user.setPresence(`You`, { type: "WATCHING" });
    //   }
    //   if (num == 5) {
    //         client.user.setPresence(`KVA`, { type: "WATCHING" });
    //     }
   
    
    // }, 36000);
});

client.login(TOKEN);