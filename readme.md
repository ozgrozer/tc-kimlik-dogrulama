# TC Kimlik Doğrulama

[![npm](https://img.shields.io/npm/v/tc-kimlik-dogrulama.svg?style=flat-square)](https://www.npmjs.com/package/tc-kimlik-dogrulama)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/ozgrozer/tc-kimlik-dogrulama/blob/master/license)

## Kurulum

```sh
# yarn ile
$ yarn add tc-kimlik-dogrulama

# npm ile
$ npm i tc-kimlik-dogrulama
```

## Kullanım

```js
const tcKimlikDogrulama = require('tc-kimlik-dogrulama')

const app = async () => {
  const verification = await tcKimlikDogrulama({
    ad: 'Ahmet',
    soyad: 'Yılmaz',
    dogumYili: '1989',
    tcKimlikNo: '94124544014'
  })

  console.log(verification)
  // true veya false döndürür
}

app()
```

## Lisans

[MIT](https://github.com/ozgrozer/tc-kimlik-dogrulama/blob/master/license)
