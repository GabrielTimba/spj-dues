import * as qrcode from 'qrcode-terminal';
import * as dotenv from 'dotenv';
import * as Whatsapp from 'whatsapp-web.js';
const { Client, LocalAuth } = Whatsapp;

import { getQuotes } from './quotes'
dotenv.config();

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

client.on('message', async message => {
	const contact= await message.getContact();
	const id=message.body.split(':')

	if(message.body === '1') {
		client.sendMessage(message.from, 'Indique o seu ID no seguinte formato *ID:seu id*\n(Exemplo ID:45adc2)');
	}
	else if(message.body === '2') {
		client.sendMessage(message.from, '*TheDue* é uma plataforma que permite a consulta do extracto de quotas da SPJ de XIBOMANA de forma instantânea');
	}
	else if(id[0].toString().toUpperCase()==='ID'){
		const quote=await getQuotes(id[1])
		let msg;

		if(Object.keys(quote).length !== 0){
			client.sendMessage(message.from, 
				'*Extracto de quotas*\n\n'+
				`Nome:${quote.name}\n`+
				`Janeiro: ${quote.jan.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} MZN \n`+
				`Fevereiro:${quote.feb.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} MZN\n`+
				`Março:${quote.mar.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} MZN\n`+
				`Abril:${quote.apr.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} MZN\n`+
				`Maio:${quote.may.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} MZN\n`+
				`Junho:${quote.june.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} MZN \n`+
				`Julho:${quote.july.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} MZN \n`+
				`Agosto:${quote.aug.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} MZN \n`+
				`Setembro:${quote.sept.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} MZN \n`+
				`Otubro:${quote.oct.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} MZN\n`+
				`Novembro:${quote.nov.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} MZN \n`+
				`Dezembro:${quote.dec.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} MZN\n\n`+
				`*Total*:${quote.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} MZN\n`
			);
			
			/** 
			 * Some funny messages acording with the amount quote credit
			 *  TO UPDATE:change fixed value with % and total value specificated on .env file
			 */
			if(quote.total==0){
				msg='Hmmm irmão 😞 vamos lá pagar quotas'
			}else if(quote.total<60 && quote.total!==0){
				msg='OK nem :-) irmão, já deu o seu pontapé de partida continue pagando as quotas '
			}else if(quote.total<120 && quote.total>60){
				msg='Hey irmão! Continue pagando quotas não desista.'
			}else if(quote.total<180 && quote.total>120){
				msg='Vamos que vamos irmão um pouco mais chega lá 😘'
			}else if(quote.total>180 && quote.total<240){
				msg='OK Ok Ok irmão, está quase lá mais um pouquinho de esforço chegamos🎈. '
			}else {
				msg='Muito obrigado 🎉🎊🎉 pelo seu comprometimendo irmão✨.'
			}

			client.sendMessage(message.from, msg)

		}else{
			client.sendMessage(message.from, 'ID não encontrado.')
			client.sendMessage(message.from, 'Indique o seu ID no seguinte formato *ID:seu id*\n(Exemplo ID:45adc)');
		}

	}
	else {
		client.sendMessage(message.from, 
			`Olá *${contact.pushname}*,seja bem vindo ao *TheDue*\n\n`+
			'Escolha uma das opções \n'+
			'1.Consultar o extracto de quotas da SPJ \n'+
			'2. Informações da plataforma \n'
		);
	}
});



