import * as qrcode from 'qrcode-terminal';
import * as dotenv from 'dotenv';
import * as Whatsapp from 'whatsapp-web.js';
const { Client, LocalAuth } = Whatsapp;

import { getQuotes } from './quotes'
dotenv.config();

const client = new Client({
  //authStrategy: new LocalAuth()
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
		client.sendMessage(message.from, '*TheDue* é uma plataforma que permite a consulta do extracto de quotas da SPJ de XIBOMANA de forma instantanea');
	}
	else if(id[0].toString().toUpperCase()==='ID'){
		const quote=await getQuotes(id[1])

		if(Object.keys(quote).length !== 0){
			client.sendMessage(message.from, 
				'*Extrato de quotas*\n\n'+
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
				`Dezembro:${quote.dec.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} MZN\n`
			);
		}else{
			client.sendMessage(message.from, 'ID não encontrado.')
			client.sendMessage(message.from, 'Indique o seu ID no seguinte formato *ID:seu id*\n(Exemplo ID:45adc2)');
		}

	}
	else {
		client.sendMessage(message.from, 
			`Olá *${contact.pushname}*,seja bem vindo ao *TheDue*\n\n`+
			'Selecione uma das opções \n'+
			'1.Consultar o extrato de quotas da SPJ \n'+
			'2. Informações da plataforma \n'
		);
	}
});



