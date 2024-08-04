import {
	Client,
	event,
	Intents,
	slash,
	SlashCommandInteraction,
} from 'harmony';
import { arithmetic, factorial, trigonometry } from './maths.ts';
import { srvID, strings, token } from './strings.ts';
import { commands } from './commands.ts';
import { getQuote } from './quote.ts';

function getCmdOption(interaction: SlashCommandInteraction, optionId: string) {
	return interaction.data.options.find((option) => option.name == optionId)!.value;
}

class AZULI extends Client {
	@event('ready')
	bootstrap() {
		commands.forEach((command) => {
			this.interactions.commands.create(command, srvID)
				.then((cmd) => console.log(`🟩 /${cmd.name} ONLINE`))
				.catch((cmd) => console.log(`🔴 /${cmd.name} FAILED`));
		});
		console.log(`AZULI is Online: https://discord.com/channels/${srvID}`);
	}

	@slash('ping')
	ping(i: SlashCommandInteraction) {
		i.respond({
			embeds: [{
				author: { name: 'United Nations' },
				title: strings.article18.title,
				description: strings.article18.text,
				color: 0x009EDB,
				type: 'article',
			}]
		});
	}

	@slash('spell')
	spell(i: SlashCommandInteraction) {
		const input: string = getCmdOption(i, 'input');
		const spelt = input.split('').toString();

		i.respond({ content: spelt });
	}

	@slash('quote')
	async quote(i: SlashCommandInteraction) {
		const { author, text } = await getQuote();

		i.respond({
			embeds: [{
				author: { name: author },
				title: text,
				provider: { name: 'Zen Quotes API', url: 'https://zenquotes.io' },
				color: 0x009473,
				type: 'article',
			}]
		});
	}

	@slash('calculate')
	calculate(i: SlashCommandInteraction) {
		const num1 = getCmdOption(i, 'num1');
		const num2 = getCmdOption(i, 'num2');
		const oprd = getCmdOption(i, 'operator');

		const result = arithmetic(num1, num2, oprd);

		i.respond({
			embeds: [{
				title: `The result is ${result}`,
				description: `Calculate ${num1} ${oprd} ${num2}`,
				color: 0xFFCC00,
			}], ephemeral: true
		});
	}

	@slash('trigonometry')
	calculateTrig(i: SlashCommandInteraction) {
		const type = getCmdOption(i, 'type');
		const rad = getCmdOption(i, 'radian');

		const result = trigonometry(type, rad);

		i.respond({
			embeds: [{
				title: `The result is ${result}`,
				description: `Calculate ${type}(${rad})`,
			}], ephemeral: true
		});
	}

	@slash('factorial')
	factorial(i: SlashCommandInteraction) {
		const input = getCmdOption(i, 'number');

		const result = factorial(input);

		i.respond({
			embeds: [{
				title: `The result is ${result}`,
				description: `Calculate factorial of ${input}`,
				color: 0xFFCC00,
			}], ephemeral: true
		});
	}
}

new AZULI().connect(token, Intents.None);
