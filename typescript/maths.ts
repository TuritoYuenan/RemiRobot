type CalcResult = number | '[Indivisible by 0]';

export enum Operators {
	Plus = '+',
	Minus = '-',
	Multiply = '*',
	Divide = '/',
}

export enum TrigTypes {
	Sine = 'sin',
	Cosine = 'cos',
	Tangent = 'tan',
}

function divide(num1: number, num2: number): CalcResult {
	if (num2 === 0) {
		return '[Indivisible by 0]';
	} else {
		return num1 / num2;
	}
}

export function arithmetic(number1: number, number2: number, operator: Operators): CalcResult {
	switch (operator) {
		case Operators.Plus:
			return number1 + number2;
		case Operators.Minus:
			return number1 - number2;
		case Operators.Multiply:
			return number1 * number2;
		case Operators.Divide:
			return divide(number1, number2);
	}
}

export function trigonometry(type: TrigTypes, radian: number): number {
	switch (type) {
		case TrigTypes.Sine:
			return Math.sin(radian);
		case TrigTypes.Cosine:
			return Math.cos(radian);
		case TrigTypes.Tangent:
			return Math.tan(radian);
	}
}
