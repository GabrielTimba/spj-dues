
export const start = (bot) => async message => {
	const chatId = message.chat.id;
	try {
		bot.sendChatAction(chatId, "typing");
		const tgUser = message.from;

		//const botName = process.env.BOT_NAME;
		const username = tgUser.first_name
			? `[${tgUser.first_name}](tg://user?id=${tgUser.id})`
			: `@${tgUser.username}`;

		const text = `Olá ${username} \u{1F60A}
		\n Seja bem vindo a plataforma XIBOTESO, anime. 
		Aqui poderá consultar os pagamentos das quotas`;

		await bot.sendMessage(chatId, text,{
			parse_mode: "Markdown",
			reply_markup: JSON.stringify({
				resize_keyboard: true,
			}),
		});
	} catch (error) {
		console.log(error)
	}
};