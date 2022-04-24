import { createSha256Hash } from 'helpers/TokenHelper'
const PHONE_SENDER = '1111'
const transactionId = 'dsakfslaff'
const name = 'hehe'
const phone = '0972902520'
const message = 'day la message'
const money = 100000

const data = {
  sender_phone_number: PHONE_SENDER,
  receivers: `[{\"phone_number\": \"${phone}\", \"name\": \"${name}\"}]`,
  transaction_id: transactionId,
  money: money,
  group_name: 'Appota',
  share_money_method: 'random',
  message: message,
  ip: '127.0.0.1',
  ts: 1111132222,
  image: 'https://static.appotapay.com/assert/fr/2021-02-03/MT4JyyAqaxpL5gatS45yLK2QQvnNI64vEt6KgciP.jpeg',
  extra_info: '{"cover":{"id":5,"image_url":"https://static.appotapay.com/scontent/cover/022018/images/top-5.png","thumb_url":"https://static.appotapay.com/scontent/cover/022018/thumb/top-5.png","color_text":"#ff2600","color_background":"#ff2600"},"image":{"id":474,"category_id":59,"image_url":"https://static.appotapay.com/assert/fr/2021-02-03/MT4JyyAqaxpL5gatS45yLK2QQvnNI64vEt6KgciP.jpeg","thumb_url":"https://static.appotapay.com/assert/fr/2021-02-03/MT4JyyAqaxpL5gatS45yLK2QQvnNI64vEt6KgciP.jpeg","color_text":"#fcfcfc","color_background":"#87151b"}}'
}

const sorted = Object.fromEntries(Object.entries(data).sort())
const joinData = Object.keys(sorted).map(key => sorted[key]).join('') + 'fukdsafl'

data.signature = createSha256Hash(joinData)
console.log(data)
