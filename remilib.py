from interactions import Embed, EmbedAuthor, EmbedFooter, Timestamp
from datetime import datetime
from dotenv import dotenv_values
import math

birthday = datetime(2018, 9, 22, 21, 45)

secrets = dotenv_values('secrets.env')
TOKEN = secrets['TOKEN_DISCORD']
SERVER = secrets['GUILD_TTS']

messageTemplate = Embed(
	color=0xEB459E,
	timestamp=Timestamp.now(),
	author=EmbedAuthor(name='Remilia the Robot'),
	footer=EmbedFooter(text='© 2023 Turito Yuenan')
)

operators: list[dict] = [
	{'value':'+', 'name':'(+) Add'},
	{'value':'-', 'name':'(-) Subtract'},
	{'value':'*', 'name':'(x) Multiply'},
	{'value':'/', 'name':'(/) Divide'},
	{'value':'^', 'name':'(^) Exponent'}
]

trigFuncs: list[dict] = [
	{'value':'sin', 'name':'Sine'},
	{'value':'cos', 'name':'Cosine'},
	{'value':'tan', 'name':'Tangent'}
]

def calculate(num1: float, num2: float, operator: str) -> float:
	"""Calculate two numbers

	Args:
		num1 (float): First number
		num2 (float): Second number
		operator (str): Operation type

	Returns:
		result (float, str): The result, throw an error if divide by 0
	"""
	match operator:
		case '+':
			result = num1 + num2
		case '-':
			result = num1 - num2
		case '*':
			result = num1 * num2
		case '^':
			result = num1 ** num2
		case '/':
			try:
				result = num1 / num2
			except ZeroDivisionError:
				result = math.nan
	return result

def trig(type: str, rad: float) -> float:
	"""Get trigonometry function result from a radian

	Args:
		type (str): Type of Trigonometry function
		rad (float): Radian value

	Returns:
		float: Result of the chosen function
	"""
	match type:
		case 'sin':
			result = math.sin(rad)
		case 'cos':
			result = math.cos(rad)
		case 'tan':
			result = math.tan(rad)
	return result
