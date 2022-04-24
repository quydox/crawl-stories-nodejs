const configs = require('configs/Env')
const asyncRedis = require('async-redis')

const redisUri = configs.REDIS.URI || 'localhost:6379'
const redis = asyncRedis.createClient(`redis://${redisUri}`, { prefix: configs.REDIS.PREFIX })

module.exports = {
  redis
}
