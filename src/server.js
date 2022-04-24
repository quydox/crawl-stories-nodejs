import FastifyServer from 'fastify'
import Init from 'init'
import Routes from 'routes'

const PORT = process.env.PORT || 3000
const LOGGER = (process.env.LOGGER === 'true')

const fastify = FastifyServer({ logger: LOGGER })

const server = async () => {
  fastify.register(Init)
  fastify.register(Routes)

  try {
    await fastify.listen(PORT, '0.0.0.0')
  } catch (e) {
    fastify.log.error(e)
    process.exit(1)
  }
}

module.exports = server
