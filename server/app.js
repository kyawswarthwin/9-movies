'use strict';

require('dotenv').config();

const program = require('commander');

program
  .version('1.0.0')
  .option('-d, --dashboard', 'parse dashboard')
  .parse(process.argv);

if (program.dashboard) {
  const http = require('http');
  const express = require('express');
  const ParseDashboard = require('parse-dashboard');

  const app = express();
  const port = process.env.PORT || 1337;

  const mountPath = process.env.PARSE_MOUNT || '/parse';
  const dashboard = ParseDashboard({
    apps: [
      {
        appId: process.env.APP_ID || '54C8D04B-D2B1-44C7-8431-51DF19320046',
        masterKey: process.env.MASTER_KEY || '87649289-FF5C-4A31-9F81-8AFD0AC490F6',
        serverURL: process.env.SERVER_URL || `http://localhost:${port}${mountPath}`,
        appName: '9 Movies'
      }
    ]
  });

  app.use(dashboard);

  const server = http.createServer(app);
  server.listen(4040, () => {
    console.log('Dashboard running on port 4040.');
  });
} else {
  const crypto = require('crypto');
  const systemInfo = require('systeminformation');
  const chalk = require('chalk');

  const VALID_CHARS = '0123456789ABCDEFGHJKLMNPQRTUVWXY';
  const KEY = '2EFD24F3-A9AD-4D3B-A981-1C87B7347411';

  checkRegistration();

  async function checkRegistration() {
    try {
      let data = await systemInfo.system();
      if (isValidSerialNumber(process.env.SERIAL_NUMBER, data.uuid, KEY)) {
        require('./server');
      } else {
        console.log(`To Register Your PC Call ${chalk.bold.green('+959972401727')}.
Machine ID: ${chalk.bold.green(data.uuid)}`);
      }
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
}
