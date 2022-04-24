import Queue from 'queues/Bee'
import S3 from 'services/AwsS3'
import { UserRepo } from 'repos'
import { UserRedis } from 'caches/redis'
import { runShellCommand } from 'helpers/ShellHelper'
import fs from 'fs'

module.exports = function (fastify, opts, next) {
  const queues = new Queue('create_thumb_user')
  queues.process(async (job) => {
    // do the job
  })
  next()
}
