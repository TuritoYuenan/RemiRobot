import math, random
from dotenv import dotenv_values
from interactions import (
	Client, Embed,
	EmbedAuthor, EmbedFooter,
	OptionType, Timestamp,
	listen, user_context_menu,
	slash_command, slash_option
)


######################################
############# SETTING UP #############
######################################


# __birthday__ = datetime(2018, 9, 22, 21, 45)
# clock = lambda u: datetime.now().strftime(u)

secrets = dotenv_values('secrets.env')

TOKEN = secrets['TOKEN_DISCORD']
SERVER = secrets['GUILD_TTS']

robot = Client(token = TOKEN, debug_scope = SERVER)
"""Remilia's core, a Discord bot client"""

msgTemplate = Embed(
	color=0xEB459E,
	timestamp=Timestamp.now(),
	author=EmbedAuthor(name='Remilia the Robot'),
	footer=EmbedFooter(text='© 2023 Turito Yuenan | Internal use only'),
)
"""Discord message template"""


######################################
############## COMMANDS ##############
######################################


@user_context_menu(name="Send virtual hug")
async def test(ctx):
	msgTemplate.title = "Hugs!"
	msgTemplate.description = f"Sending virtual hug to {ctx.target.user.username}!"

	await ctx.send(embeds = msgTemplate)



@slash_command(name='pat', description='Pat remi')
async def pat(ctx): await ctx.send('wah!')



@slash_command(name='echo', description='Repeat what you said')
@slash_option(name='input', description='what you said', opt_type=OptionType.STRING, required=True)
async def echo(ctx, *, input: str):
	msgTemplate.title = f'<@{ctx.author.id}> said:'
	msgTemplate.description = input

	await ctx.send(embeds = msgTemplate)



@slash_command(name='spell', description='Give you a list of letters from your word')
@slash_option(name='word', description='your word', opt_type=OptionType.STRING, required=True)
async def spell(ctx, word: str):
	output = ", ".join([letter for letter in word])
	await ctx.send(output)



@slash_command(name='tellremi', description='Tell Remi')
@slash_option(name = 'input', description = 'What to tell', opt_type = OptionType.STRING, required = True,
	choices = [
		{'value':'nicejob', 'name':'Nice job'},
		{'value':'goodnight', 'name':'Good night'},
	]
)
async def tellremi(ctx, input: str):
	match input:
		case 'nicejob': msgTemplate.title = 'tenkyou!'
		case 'goodnight': msgTemplate.title = 'sleep well!!'

	await ctx.send(embeds = msgTemplate)



@slash_command(name='calculate', description='Calculate two numbers')
@slash_option(name='num1', description='1st number', opt_type=OptionType.NUMBER, required=True)
@slash_option(name='num2', description='2nd number', opt_type=OptionType.NUMBER, required=True)
@slash_option(name='type', description='Operation type', opt_type=OptionType.STRING, required=True,
	choices = [
		{'value':'+', 'name':'(+) Add'},
		{'value':'-', 'name':'(-) Subtract'},
		{'value':'*', 'name':'(x) Multiply'},
		{'value':'/', 'name':'(/) Divide'},
		{'value':'^', 'name':'(^) Exponent'},
	]
)
async def calculate(ctx, type: str, num1: float, num2: float):
	match type:
		case '+': result = num1 + num2
		case '-': result = num1 - num2
		case '*': result = num1 * num2
		case '^': result = num1 ** num2
		case '/':
			try: result = num1 / num2
			except ZeroDivisionError: result = 'NULL'

	msgTemplate.title = f'Your result is {str(result)}'
	msgTemplate.description = f'Calculate: {num1} {type} {num2}'

	await ctx.send(embeds = msgTemplate)



@slash_command(name='trigonometry', description='Do trigonometry')
@slash_option(name='trig', description='Trig function', opt_type=OptionType.STRING, required=True,
	choices=[
		{'value':'sin', 'name':'Sine'},
		{'value':'cos', 'name':'Cosine'},
		{'value':'tan', 'name':'Tangent'},
	]
)
@slash_option(name='rad', description='Radian', opt_type=OptionType.NUMBER)
async def trigonometry(ctx, trig: str, rad: float = 1.0):
	match trig:
		case 'sin': result = math.sin(rad)
		case 'cos': result = math.cos(rad)
		case 'tan': result = math.tan(rad)

	msgTemplate.title = f'Your result is {result}'
	msgTemplate.description = f'Calculate: {trig}({rad})'

	await ctx.send(embeds = msgTemplate)



@slash_command(name='factorial', description='Calculate the factorial')
@slash_option(name='num', description='Number', opt_type=OptionType.INTEGER, required=True)
async def factorial(ctx, num: int = 1):
	result = math.factorial(num)

	msgTemplate.title = f'Your result is {result}'
	msgTemplate.description = f'Calculate: {num}!'

	await ctx.send(embeds = msgTemplate)



@slash_command(name='randomnumber', description='Generate a random number')
@slash_option(name='from_num', description='Range bottom', opt_type=OptionType.INTEGER, required=True)
@slash_option(name='to_num', description='Range top', opt_type=OptionType.INTEGER, required=True)
async def randomnumber(ctx, from_num: int = 0, to_num: int = 100000):
	rnum = random.randint(from_num, to_num)

	msgTemplate.title = f'Your number is {rnum}'
	msgTemplate.description = f'Generate random number from {from_num} to {to_num}'

	await ctx.send(embeds = msgTemplate)


######################################
############# ACTIVATION #############
######################################


@listen()
async def on_ready():
	print('Ready! Serving Discord server', SERVER)

robot.start()
