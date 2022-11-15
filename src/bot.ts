import TelegramBot from 'node-telegram-bot-api';
import * as dotenv from 'dotenv';
import {getQuotes} from './quotes';
import command from './commands';

dotenv.config();

const token = process.env.Telegram_Token;

const bot = new TelegramBot(token,{polling:true});

bot.setMyCommands([
  {command: '/start', description: 'Seja bem vindo a plataforma.'},
  {command: '/info', description: 'Informações'},
  {command: '/xiboteso', description: 'consulta'},
])

bot.onText(/\/start/, command.start(bot));

bot.on('message',(msg)=>{
  const chatId= msg.chat.id;

  if(msg.text.toString().toUpperCase().includes("XIBOTESO")){
    bot.sendMessage(chatId,"Qual é o seu ID?").then(()=>{
    })
  }
})