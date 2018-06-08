'use strict';

require('dotenv').config();
const crypto = require('crypto');
const systemInfo = require('systeminformation');
const chalk = require('chalk');
const readline = require('readline');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const VALID_CHARS = '0123456789ABCDEFGHJKLMNPQRTUVWXY';
const KEY = 'C6944266-693B-4F2B-B4F1-ACA2A9F24A4E';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const saltRounds = 10;

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
    .update(`${bcrypt.hashSync(uuid, saltRounds)}${bcrypt.hashSync(key, saltRounds)}`)
    .digest('hex');
  for (let i = 0; i < 16; i++) {
    let char = parseInt(md5.substr(i * 2, 2), 16) % 32;
    sn += VALID_CHARS.substr(char, 1);
  }
  return sn;
}
