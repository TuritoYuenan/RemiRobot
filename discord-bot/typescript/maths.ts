export enum Operators {
	Plus = '+',
	Minus = '-',
	Multiply = '*',
	Divide = '/',
}

export enum TrigFuncs {
	Sine = 'sin',
	Cosine = 'cos',
	Tangent = 'tan',
}

/**
 * Arithmetic calculation
 */
export function arithmetic(
	number1: number,
	number2: number,
	operator: Operators,
): number {
	switch (operator) {
		case Operators.Plus:
			return number1 + number2;
		case Operators.Minus:
			return number1 - number2;
		case Operators.Multiply:
			return number1 * number2;
		case Operators.Divide:
			if (number2 === 0) return NaN;
			return number1 / number2;
	}
}

/**
 * Trigonometry calculation
 */
export function trigonometry(func: TrigFuncs, radian: number): number {
	switch (func) {
		case TrigFuncs.Sine:
			return Math.sin(radian);
		case TrigFuncs.Cosine:
			return Math.cos(radian);
		case TrigFuncs.Tangent:
			return Math.tan(radian);
	}
}

/**
 * Factorial calculation
 */
export function factorial(input: number): number {
	if (input == 1) return 1;
	return input * factorial(input - 1);
}
