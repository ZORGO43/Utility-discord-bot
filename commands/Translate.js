const { SlashCommandBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');

const languageNames = {
  'en': 'English',  
  'de': 'German',
  'fr': 'French',
  'it': 'Italian',  
  'es': 'Spanish',  
  'ja': 'Japanese',
  'zh-CN': 'Chinese (Simplified)',  
  'ko': 'Korean', 
  'hu': 'Hungarian',
  'ru': 'Russian',  
  // 'pt': 'Portugese - 🇵🇹',  
  'hi': 'Hindi',    
  'nl': 'Dutch',  
  'sv': 'Swedish', 
  'tr': 'Turkish', 
  'pl': 'Polish', 
  'el': 'Greek', 
  'cs': 'Czech', 
  // 'da': 'Danish - 🇩🇰', 
  // 'et': 'Estonian - 🇪🇪', 
  'fi': 'Finnish', 
  // 'ga': 'Irish - 🇮🇪', 
  // 'lt': 'Lithuanian - 🇱🇹', 
  // 'no': 'Norwegian - 🇳🇴', 
  'ro': 'Romanian', 
  'sk': 'Slovak', 
  'uk': 'Ukrainian', 
  'hr': 'Croatian', 
  // 'af': 'Afrikaans - 🇦🇫', 
  // 'am': 'Amharic - 🇦🇲', 
  'ar': 'Arabic', 
  // 'az': 'Azerbaijani - 🇦🇿', 
  // 'be': 'Belarusian - 🇧🇾', 
  // 'bg': 'Bulgarian - 🇧🇬', 
  // 'ka': 'Georgian - 🇬🇪', 
  'iw': 'Hebrew', 
  // 'is': 'Icelandic - 🇮🇸', 
  // 'id': 'Indonesian - 🇮🇩',   
  // 'lv': 'Latvian - 🇱🇻', 
  // 'mk': 'Macedonian - 🇲🇰', 
  // 'ms': 'Malay - 🇲🇾', 
  // 'sr': 'Serbian - 🇷🇸', 
  'sl': 'Slovenian', 
  //'th': 'Thai', 
  //'vi': 'Vietnamese - 🇻🇳', 
};

module.exports = {
    data: new SlashCommandBuilder()
    .setName('translate-to')
    .setDescription('Translate a message to a selected language and send it to the discord channel')
    .addStringOption(option => option.setName('message').setDescription('The message you want to translate').setRequired(true))
    
    .addStringOption(option => {
      option.setName('language')
      .setDescription('The language you want to translate to')
      .setRequired(true);
      
      let choices = Object.entries(languageNames).map(([key, value]) => {
        return {
            name: value,
            value: key
        };
      });
      
      for (let i = 0; i < choices.length; i++) {        
        option.addChoices(choices[i]);
      }
      return option;
    }),
    
    async execute (interaction) {
        const message = interaction.options.getString('message');
        const language = interaction.options.getString('language');

        const translated = await translate(message, { to: language });
        let originalLanguage = languageNames[translated.from.language.iso] || translated.from.language.iso;
        const member = interaction.user;
        interaction.channel
          .createWebhook({
            name: member.username,
            avatar: member.displayAvatarURL({ dynamic: true }),
          })
          .then((webhook) => {
            webhook.send({ content:  translated.text });
            setTimeout(() => {
              webhook.delete();
            }, 3000);
          });
        interaction.reply({
          //Use this if you need
        //  content: "The message has been translated to " + languageNames[language] + " and sent successfully\n\nOriginal message written in " + originalLanguage +"\n\n" + message,
        
         content: "Done. The Orginal Text was in " + originalLanguage,
          ephemeral: true,
        });
    }
}
