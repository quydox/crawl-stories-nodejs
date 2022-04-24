const YMDHis = () => {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

const timeStampToYMDHis = (timeStamp) => {
  return new Date(timeStamp * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const timeStamp = () => {
  return Math.round((new Date()).getTime() / 1000)
}

const microTimeStamp = () => {
  return Date.now() / 1000
}

const dateToTimeStamp = (str) => {
  return (new Date(str).getTime() / 1000)
}

const strToTime = (str) => {
  const m = str.match(/(\d+)\s([a-z]+)/)
  if (m === undefined) return timeStamp()

  const q = parseInt(m[1])
  const r = m[2]

  if (r.indexOf('seconds') !== -1) return timeStamp() - q
  else if (r.indexOf('minute') !== -1) return timeStamp() - q * 60
  else if (r.indexOf('hour') !== -1) return timeStamp() - (q * 60 * 60)
  else if (r.indexOf('day') !== -1) return timeStamp() - (q * 60 * 60 * 24)
  else return timeStamp()
}

module.exports = {
  sleep,
  YMDHis,
  timeStamp,
  timeStampToYMDHis,
  microTimeStamp,
  dateToTimeStamp,
  strToTime
}
