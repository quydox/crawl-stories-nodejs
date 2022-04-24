import request from 'request'

const get = async (url, headers = {}, json = false) => {
  return new Promise((resolve, reject) => {
    headers = Object.keys(headers).length === 0 ? {} : headers

    const options = {
      uri: url,
      method: 'GET',
      headers: headers,
      timeout: 5000,
      followRedirect: true
    }

    if (json !== false) options.json = json

    request(options, function (error, response, body) {
      if (error) { resolve(false) } else { resolve(body) }
    })
  })
}

const post = async (url, data, headers = {}) => {
  return new Promise((resolve, reject) => {
    headers = Object.keys(headers).length === 0
      ? {
          'cache-control': 'no-cache',
          'content-type': 'application/x-www-form-urlencoded'
        }
      : headers

    const options = {
      uri: url,
      method: 'POST',
      form: data,
      headers: headers,
      timeout: 5000
    }

    request(options, function (error, response, body) {
      if (error) { resolve(false) } else { resolve(body) }
    })
  })
}

const postJson = async (url, data, headers = {}) => {
  const contentType = {
    'content-type': 'application/json'
  }
  return new Promise((resolve, reject) => {
    headers = Object.keys(headers).length === 0
      ? contentType
      : { ...headers, ...contentType }

    const options = {
      uri: url,
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers,
      timeout: 5000
    }

    request(options, function (error, response, body) {
      if (error) { resolve(false) } else { resolve(body) }
    })
  })
}

const putJson = async (url, json = {}) => {
  return new Promise((resolve, reject) => {
    const options = {
      uri: url,
      method: 'PUT',
      json: json,
      headers: {
        'content-type': 'application/json'
      },
      timeout: 5000
    }

    request(options, function (error, response, body) {
      if (error) { resolve(false) } else { resolve(body) }
    })
  })
}

module.exports = {
  get,
  post,
  postJson,
  putJson
}
