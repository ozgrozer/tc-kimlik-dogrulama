const https = require('https')

const post = props => {
  return new Promise((resolve, reject) => {
    const { options, body } = props

    const req = https.request(options, res => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        resolve(data)
      })
    })

    if (body) {
      req.write(body)
    }

    req.on('error', e => {
      reject(e)
    })

    req.end()
  })
}

const tcKimlikDogrulama = async props => {
  try {
    const { tcKimlikNo, ad, soyad, dogumYili } = props

    const body = `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
      <TCKimlikNo>${tcKimlikNo}</TCKimlikNo>
      <Ad>${ad}</Ad>
      <Soyad>${soyad}</Soyad>
      <DogumYili>${dogumYili}</DogumYili>
    </TCKimlikNoDogrula>
  </soap12:Body>
</soap12:Envelope>`

    const request = await post({
      body,
      options: {
        port: 443,
        method: 'post',
        path: '/Service/KPSPublic.asmx',
        hostname: 'tckimlik.nvi.gov.tr',
        headers: { 'Content-Type': 'application/soap+xml' }
      }
    })

    const searchPattern = '<TCKimlikNoDogrulaResult>(.*)</TCKimlikNoDogrulaResult>'
    const foundPart = request.match(new RegExp(searchPattern))

    return foundPart[1] === 'true'
  } catch (err) {
    console.log(err)
  }
}

module.exports = tcKimlikDogrulama
