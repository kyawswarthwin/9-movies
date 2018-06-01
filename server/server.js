'use strict';

require('dotenv').config();
const http = require('http');
const express = require('express');
const responseTime = require('response-time');
const compression = require('compression');
const cors = require('cors');
const { ParseServer } = require('parse-server');
const ParseDashboard = require('parse-dashboard');
const path = require('path');

const parseServerRequest = require('./cloud/utils/request');

const app = express();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 1337;
const mountPath = process.env.PARSE_MOUNT || '/parse';

const appName = 'Parse Server Boilerplate';
const appId = process.env.APP_ID || '54C8D04B-D2B1-44C7-8431-51DF19320046';
const masterKey = process.env.MASTER_KEY || '87649289-FF5C-4A31-9F81-8AFD0AC490F6';
const serverURL = process.env.SERVER_URL || `http://${host}:${port}${mountPath}`;

const api = new ParseServer({
  appId: appId,
  masterKey: masterKey,
  databaseURI:
    process.env.MONGODB_URI ||
    process.env.MONGO_URL ||
    process.env.DATABASE_URL ||
    'mongodb://localhost:27017/dev',
  // Cloud Code
  serverURL: serverURL,
  cloud: path.join(__dirname, 'cloud/main.js'),
  // Live Queries
  liveQuery: {
    classNames: []
  },
  // // Storage
  // filesAdapter: {
  //   module: '@parse/s3-files-adapter',
  //   options: {
  //     directAccess: true
  //   }
  // },
  // // Email Verification & Password Reset
  // verifyUserEmails: true,
  // appName: appName,
  // publicServerURL: serverURL,
  // emailAdapter: {
  //   module: '@parse/simple-mailgun-adapter',
  //   options: {
  //     apiKey: process.env.MAILGUN_API_KEY,
  //     domain: process.env.MAILGUN_DOMAIN,
  //     fromAddress: `no-reply@${process.env.MAILGUN_DOMAIN.split('.')
  //       .splice(1)
  //       .join('.')}`
  //   }
  // },
  // // Security
  // passwordPolicy: {
  //   validatorPattern: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]).{6,}$/,
  //   doNotAllowUsername: true,
  //   maxPasswordHistory: 5,
  //   resetTokenValidityDuration: 24 * 60 * 60
  // },
  // accountLockout: {
  //   threshold: 3,
  //   duration: 5
  // },
  allowClientClassCreation: process.env.NODE_ENV === 'production' ? false : true
});

const dashboard = new ParseDashboard({
  apps: [
    {
      appId: appId,
      masterKey: masterKey,
      serverURL: serverURL,
      appName: appName
    }
  ],
  trustProxy: 1,
  users: [
    {
      user: process.env.PARSE_DASHBOARD_USER_ID || 'admin',
      pass: process.env.PARSE_DASHBOARD_USER_PASSWORD || 'admin'
    }
  ]
});

const mediaDir = process.env.MEDIA_DIR || path.join(process.cwd(), 'media');

app.use(responseTime());
app.use(compression());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mountPath, api);
app.use('/dashboard', dashboard);
app.use('/media', express.static(mediaDir));

app.get('/download', async (req, res) => {
  try {
    let { type, id } = req.query;
    let Obj;
    switch (type) {
      case 'movies':
        Obj = require('./app/models/Movie');
        break;
      case 'series':
        Obj = require('./app/models/Serie');
        break;
      case 'music':
        Obj = require('./app/models/Music');
        break;
      case 'applications':
        Obj = require('./app/models/Application');
        break;
      case 'games':
        Obj = require('./app/models/Game');
        break;
      default:
        break;
    }
    let obj = new Obj();
    let query = new Parse.Query(obj);
    query.equalTo('objectId', id);
    let data = await query.first();
    if (data) {
      res.download(path.join(mediaDir, data.get('file')));
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(404).json({
      error: 'Not Found'
    });
  }
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running on port ${port}.`);
  parseServerRequest('/jobs/watchMedia', 'POST', true)
    .then(() => {
      console.log('Watching Media...');
    })
    .catch(console.error);
});
ParseServer.createLiveQueryServer(server);
