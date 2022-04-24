import { redis } from 'caches'

const KEYS = {
  LAST_RECORDS: () => {
    return `last_records`
  }
}

const addLastRecord = async (data) => {
  await redis.rpush(KEYS.LAST_RECORDS(), JSON.stringify(data))
}

const removeFirstOnLastRecord = async () => {
  await redis.lpop(KEYS.LAST_RECORDS())
}

module.exports = {
  addLastRecord,
  removeFirstOnLastRecord
}
