'use strict';

const crypto = require('crypto');

const VALID_CHARS = '0123456789ABCDEFGHJKLMNPQRTUVWXY';
const KEY = '2EFD24F3-A9AD-4D3B-A981-1C87B7347411';

console.log(generateSerialNumber('19A1237B-A889-11E6-454D-90CF72F727CD', KEY));

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
