/**
 * discord bot サンプル
 */
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// メッセージが発言されたときに実行するイベント
client.on('message', msg => {
	// '/hello'と入力したら'hello!'とbotから発言する
	if (msg.content === '/hello') {
		msg.reply('hello!');
	}
	let deleteHandler = () => {
		let cnt = 0;
		msg.channel.fetchMessages({limit: 100})
		.then(messages => {
			let messagesArr = messages.array();
			let messageCnt = messagesArr.length;
			for(let i = 0; i < messageCnt; i++) {
				console.log(`delete : ${i + 1} / ${messagesArr.length}`);
				messagesArr[i].delete()
				.then(() => {
					cnt = cnt + 1;
					if(cnt >= 100) {
						deleteHandler();
					}
				})
				.catch(() => {
					cnt = cnt + 1;
					if(cnt >= 100) {
						deleteHandler();
					}
				})
			}
		})
		.catch((err) => {
			console.log(`error thrown`);
			console.log(err);
		});
	};
	// '!::rmall'と入力したらそのテキストチャンネルの全発言を削除する
	// 自分のidのみで発動させることをおすすめします
	if(msg.content === '!::rmall' && msg.author.id === 'yourID') {
		deleteHandler();
	}
});

client.login('bot token');
