import 'dotenv';

export const token: string = Deno.env.get('TOKEN') || 'NOT FOUND';
export const srvID: string = Deno.env.get('SERVER') || 'NOT FOUND';

export const strings = {
	article18: {
		title: `Universal Declaration of Human Rights, Article 18`,
		text:
			`Everyone has the right to freedom of thought, conscience and religion;
			this right includes freedom to change his religion or belief, and freedom,
			either alone or in community with others and in public or private, to manifest
			his religion or belief in teaching, practice, worship and observance.`,
	},
};
