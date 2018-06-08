'use strict';

const crypto = require('crypto');

const VALID_CHARS = '0123456789ABCDEFGHJKLMNPQRTUVWXY';
const KEY = 'C6944266-693B-4F2B-B4F1-ACA2A9F24A4E';

console.log(generateSerialNumber(process.argv[2], KEY));

function generateSerialNumber(uuid, key) {
  let sn = '';
  let md5 = crypto
    .createHash('md5')
    .update(`${uuid};${key}`)
    .digest('hex');
  for (let i = 0; i < 16; i++) {
    let char = parseInt(md5.substr(i * 2, 2), 16) % 32;
    sn += VALID_CHARS.substr(char, 1);
  }
  return sn;
}
