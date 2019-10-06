import Koa from 'koa'
import Router from '@koa/router'
import Blockchain, { Block } from '../blockchain'

const { HTT_PORT = 3000 } = process.env

const app = new Koa()
const router = new Router()
const blockchain = new Blockchain()

// Use logger

app.use(async (ctx, next) => {
  await next()
  const responseTime = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${responseTime}`)
})

// Set x-response-time

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const time = Date.now() - start
  ctx.set('X-Response-Time', `${time}ms`)
})

router.get('/blocks', (ctx, next) => {
  ctx.body = blockchain.blocks
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(HTT_PORT, () => {
  console.log(`Service HTTP:${HTT_PORT} listening...`)
})
