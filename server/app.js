'use strict';

require('dotenv').config();
const crypto = require('crypto');
const systemInfo = require('systeminformation');
const chalk = require('chalk');
const readline = require('readline');
const path = require('path');
const fs = require('fs');

const VALID_CHARS = '0123456789ABCDEFGHJKLMNPQRTUVWXY';
const KEY = '2EFD24F3-A9AD-4D3B-A981-1C87B7347411';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let deviceId;

checkRegistration();

async function checkRegistration() {
  try {
    let data = await systemInfo.system();
    deviceId = data.uuid;
    if (isValidSerialNumber(process.env.SERIAL_NUMBER, deviceId, KEY)) {
      require('./server');
    } else {
      console.log(`To Register Your PC Call ${chalk.bold.green('+959972401727')}.
Device ID: ${chalk.bold.green(deviceId)}`);
      checkSerialNumber();
    }
  } catch (error) {
    console.error(error);
  }
}

function checkSerialNumber() {
  try {
    rl.question('Serial Number: ', sn => {
      if (isValidSerialNumber(sn, deviceId, KEY)) {
        fs.appendFileSync(path.join(process.cwd(), '.env'), `SERIAL_NUMBER=${sn}`);
        require('./server');
      } else {
        console.error(chalk.bold.red('Error: Invalid Serial Number'));
        checkSerialNumber();
      }
    });
  } catch (error) {
    console.error(error);
  }
}

function isValidSerialNumber(sn, uuid, key) {
  return sn === generateSerialNumber(uuid, key);
}

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
