'use strict';

const os = require('os');
const path = require('path');
const chokidar = require('chokidar');
const metadata = require('easy-metadata');
const packageInfo = require('easy-aapt');

const Movie = require('../../app/models/Movie');
const Serie = require('../../app/models/Serie');
const Music = require('../../app/models/Music');
const Application = require('../../app/models/Application');
const Game = require('../../app/models/Game');

const mediaDir = process.env.MEDIA_DIR || path.join(process.cwd(), 'media');
const Media = {
  Movie: ['.mp4'],
  Serie: ['.mp4'],
  Music: ['.mp3'],
  Application: ['.apk'],
  Game: ['.apk']
};

function watchMedia(request, status) {
  const watcher = chokidar.watch('.', {
    ignoreInitial: true,
    cwd: mediaDir,
    awaitWriteFinish: true,
    ignorePermissionErrors: true
  });
  watcher.on('all', (event, file) => {
    const type = file && file.match(/[^/\\]+/)[0].toLowerCase();
    const ext = path.extname(file).toLowerCase();
    file = file.replace(/\\/g, '/');
    switch (type) {
      case 'movies':
        if (Media.Movie.includes(ext)) onMovie(event, file);
        break;
      case 'series':
        if (Media.Serie.includes(ext)) onSerie(event, file);
        break;
      case 'music':
        if (Media.Music.includes(ext)) onMusic(event, file);
        break;
      case 'applications':
        if (Media.Application.includes(ext)) onApplication(event, file);
        break;
      case 'games':
        if (Media.Game.includes(ext)) onGame(event, file);
        break;
      default:
        break;
    }
  });
}

async function onMovie(event, file) {
  const filePath = path.join(mediaDir, file);
  const query = new Parse.Query(Movie);
  query.equalTo('file', file);
  let data = await query.first();
  switch (event) {
    case 'add':
    case 'change':
      const movie = new Movie();
      if (data) movie.id = data.id;
      movie.set('file', file);
      let tags = await metadata(filePath)
        .then(tags => {
          delete tags.album;
          delete tags.track;
          tags.picture = tags.picture && new Parse.File('picture', { base64: tags.picture });
          return tags;
        })
        .catch(console.error);
      movie.save(tags);
      break;
    case 'unlink':
      if (data) data.destroy();
      break;
    default:
      break;
  }
}

async function onSerie(event, file) {
  const filePath = path.join(mediaDir, file);
  const query = new Parse.Query(Serie);
  query.equalTo('file', file);
  let data = await query.first();
  switch (event) {
    case 'add':
    case 'change':
      const serie = new Serie();
      if (data) serie.id = data.id;
      serie.set('file', file);
      let tags = await metadata(filePath)
        .then(tags => {
          tags.picture = tags.picture && new Parse.File('picture', { base64: tags.picture });
          return tags;
        })
        .catch(console.error);
      serie.save(tags);
      break;
    case 'unlink':
      if (data) data.destroy();
      break;
    default:
      break;
  }
}

async function onMusic(event, file) {
  const filePath = path.join(mediaDir, file);
  const query = new Parse.Query(Music);
  query.equalTo('file', file);
  let data = await query.first();
  switch (event) {
    case 'add':
    case 'change':
      const music = new Music();
      if (data) music.id = data.id;
      music.set('file', file);
      let tags = await metadata(filePath)
        .then(tags => {
          tags.picture = tags.picture && new Parse.File('picture', { base64: tags.picture });
          return tags;
        })
        .catch(console.error);
      music.save(tags);
      break;
    case 'unlink':
      if (data) data.destroy();
      break;
    default:
      break;
  }
}

function onApplication(event, file) {
  const filePath = path.join(mediaDir, file);
  switch (event) {
    case 'add':
    case 'change':
      packageInfo(filePath, path.join(process.cwd(), 'bin', os.platform(), 'aapt'))
        .then(data => {
          const application = new Application();
          data.file = file;
          data.icon = new Parse.File('icon', { base64: data.icon });
          application.save(data);
        })
        .catch(console.error);
      break;
    case 'unlink':
      const query = new Parse.Query(Application);
      query.equalTo('file', file);
      query.first().then(data => {
        data.destroy();
      });
      break;
    default:
      break;
  }
}

function onGame(event, file) {
  const filePath = path.join(mediaDir, file);
  switch (event) {
    case 'add':
    case 'change':
      packageInfo(filePath, path.join(process.cwd(), 'bin', os.platform(), 'aapt'))
        .then(data => {
          const game = new Game();
          data.file = file;
          data.icon = new Parse.File('icon', { base64: data.icon });
          game.save(data);
        })
        .catch(console.error);
      break;
    case 'unlink':
      const query = new Parse.Query(Game);
      query.equalTo('file', file);
      query.first().then(data => {
        data.destroy();
      });
      break;
    default:
      break;
  }
}

module.exports = {
  watchMedia: watchMedia
};
