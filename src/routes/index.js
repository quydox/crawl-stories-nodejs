import FastifyPlugin from 'fastify-plugin'

async function allRoutes (fastify, opts) {
  fastify.register(require('./api'))
}

module.exports = FastifyPlugin(allRoutes)
