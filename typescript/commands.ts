import { SlashCommandPartial } from 'harmony';
import { Operators } from './maths.ts';

export const commands: SlashCommandPartial[] = [{
	name: 'ping',
	description: 'Return Article 18 in the UDHR',
}, {
	name: 'spell',
	description: 'Spell out the inputed word',
	options: [{
		name: 'input',
		description: 'Word to spell',
		type: 'STRING',
		required: true,
	}],
}, {
	name: 'calculate',
	description: 'Do basic calculation',
	options: [{
		name: 'num1',
		description: 'First number',
		type: 'NUMBER',
		required: true,
	}, {
		name: 'num2',
		description: 'Second number',
		type: 'NUMBER',
		required: true,
	}, {
		name: 'operator',
		description: 'Operator',
		type: 'STRING',
		required: true,
		choices: [
			{ name: '(+) Add', value: Operators.Plus },
			{ name: '(-) Subtract', value: Operators.Minus },
			{ name: '(×) Multiply', value: Operators.Multiply },
			{ name: '(÷) Divide', value: Operators.Divide },
		],
	}],
}];
