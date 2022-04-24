import Queue from 'queues/Bee'

const addJob = async (userId) => {
  const queue = new Queue('create_thumb_user')
  const job = queue.createJob({ user_id: userId })
  await job.save()

  return true
}

module.exports = {
  addJob
}
