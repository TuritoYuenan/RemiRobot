from discord import Embed, Intents
from discord.ext import commands
from datetime import datetime

import math

######################################
############# SETTING UP #############
######################################

robot = commands.Bot(command_prefix='remi|', intents=Intents.all())
"Remilia's Discord bot self"

msgTemplate = Embed(colour=0x4682FA, timestamp=datetime.now())
"Template for Discord messages"

######################################
############## COMMANDS ##############
######################################

@robot.hybrid_command(name='pat')
async def pat(ctx): await ctx.send('uwa!')

@robot.hybrid_command(name='nicejob')
async def nicejob(ctx): await ctx.send('ΟωΟ')

@robot.hybrid_command(name='goodnight')
async def goodnight(ctx): await ctx.send('Sleep well!')

@robot.hybrid_command(name='flush')
async def flush(ctx): await ctx.send(':flushed:')

@robot.hybrid_command(name='grimace')
async def grimace(ctx): await ctx.send(':grimacing:')

@robot.hybrid_command(name='echo')
async def echo(ctx, *, input): await ctx.send(f'<@{ctx.author.id}>: '+ input)

@robot.hybrid_command(name='spell')
async def spell(ctx, word): await ctx.send([letter for letter in word])

"""
@robot.hybrid_command(name='random')
async def generate(ctx, type, low = 0, high = 2**31):
	if type == 'number': await ctx.send(lib.ranRange(low, high))
	if type == 'quote' : await ctx.send(lib.quote)

@robot.hybrid_command(name='accuweather')
async def accuweather(ctx):
	rpClimate = Embed(title='Weather at '+w.location, description=w.overview, color=0x4682FA)
	rpClimate.set_thumbnail(url=w.icoB)
	rpClimate.set_footer(text='AccuWeather, '+w.rpTime, icon_url=w.icoA)
	for i in w.mainReport: rpClimate.add_field(inline=True, name=i[0], value=i[1])
	await ctx.send(embed = rpClimate)

@robot.hybrid_command(name='shannon_here')
async def shannon_here(ctx):
	if   ctx.author.id == lib.frends['Shannon']: await ctx.send('Hi Ne-chan!')
	elif ctx.author.id == lib.frends['Turito']:  await ctx.send(lib.DadNotShannon)
	else: await ctx.send('But you are not Ne-chan!')

@robot.hybrid_command(name='turito_here')
async def turito_here(ctx):
	if   ctx.author.id == lib.frends['Turito']:  await ctx.send('oh hi dad')
	elif ctx.author.id == lib.frends['Shannon']: await ctx.send(lib.ShannonNotDad)
	else: await ctx.send('But you are not my dad!')
"""

@robot.hybrid_command(name='calculate')
async def calculate(ctx, func, input = 1.0):
	ulation = {
		'sin': math.sin(input), 'cos': math.cos(input),
		'tan': math.tan(input), 'exp': math.exp(input),
		'pie': math.pi * input, 'fac': math.factorial(int(input)),
	}
	await ctx.send(ulation[func])

@robot.hybrid_command(name='sum')
async def sum(ctx, input): await ctx.send(math.fsum(list(map(float, input.split('#')))))

@robot.hybrid_command(name='trigonometry')
async def trigonometry(ctx, trig, rad = 1.0):
	match trig:
		case 'sin': result = math.sin(rad)
		case 'cos': result = math.cos(rad)
		case 'tan': result = math.tan(rad)
		case 'cot': result = 1 / math.tan(rad)

	msgTemplate.title = f'The result is {result}'
	msgTemplate.add_field(inline=True, name='Type', value=trig)
	msgTemplate.add_field(inline=True, name='Radian value', value=rad)

	await ctx.send(embed = msgTemplate)


######################################
############# ACTIVATION #############
######################################


@robot.event
async def on_ready(): print('RemiBot is ready for command')

robot.run(input("Token for RemiBot: "))
