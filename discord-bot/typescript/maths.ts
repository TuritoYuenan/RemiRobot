type CalcResult = number | '[Indivisible by 0]';

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
 * Division between two numbers
 * @param num1 First number
 * @param num2 Second number
 * @returns The division result
 */
function divide(num1: number, num2: number): CalcResult {
	if (num2 === 0) return '[Indivisible by 0]';
	return num1 / num2;
}

/**
 * Do an arithmetic calculation
 * @param number1 First number
 * @param number2 Second number
 * @param operator Operator
 * @returns The calculation result
 */
export function arithmetic(
	number1: number,
	number2: number,
	operator: Operators,
): CalcResult {
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

/**
 * Do a trigonometry function
 * @param func Trigonometry function
 * @param radian Input number in radian
 * @returns The calculation result
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
