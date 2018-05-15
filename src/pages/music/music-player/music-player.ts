import { Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import Plyr from 'plyr';

import { BasePage } from '../../base/base';
import { MusicProvider as Music } from '../../../providers/music/music';

@IonicPage({
  segment: 'songs/:id/:isAlbum',
  defaultHistory: ['MusicPage']
})
@Component({
  selector: 'page-music-player',
  templateUrl: 'music-player.html'
})
export class MusicPlayerPage extends BasePage {
  @ViewChild('audio') audio: ElementRef;

  song: Music;
  isAlbum: boolean;
  tracks: Music[];
  currentTrack: number;
  player: any;

  constructor(public injector: Injector) {
    super(injector);

    this.song = new Music();
    this.song.id = this.navParams.data.id;
    this.isAlbum = this.navParams.data.isAlbum;
  }

  async ionViewDidLoad() {
    try {
      this.showLoadingView('Loading...');
      await this.song.fetch();
      if (this.isAlbum) {
        this.tracks = await Music.load({
          field: 'album',
          value: this.song.album,
          sortBy: 'track'
        });
        this.currentTrack = this.tracks.findIndex(data => data.id === this.song.id);
      }
      this.showContentView();
      this.player = this.loadAudio(this.getDownloadUrl('music', this.song.file));
      this.play();
    } catch (error) {
      if (error.code === 101) {
        this.showEmptyView();
      } else {
        this.showErrorView();
      }
    }
  }

  play() {
    if (this.isAlbum) {
      this.player.on('ended', event => {
        if (this.tracks.length > this.currentTrack + 1) {
          this.currentTrack++;
          this.song = this.tracks[this.currentTrack];
          this.player.media.src = this.getDownloadUrl('music', this.song.file);
          this.play();
        }
      });
    }
    this.player.play();
  }

  loadAudio(url: string) {
    const audio = this.audio.nativeElement as HTMLAudioElement;
    audio.src = url;
    return new Plyr(audio, {
      iconUrl: 'assets/imgs/plyr.svg',
      blankVideo: 'assets/misc/blank.mp4',
      controls: [
        'play-large',
        // 'restart',
        // 'rewind',
        'play',
        // 'fast-forward',
        'progress',
        'current-time',
        'mute',
        'volume',
        'captions',
        // 'settings',
        'pip',
        'airplay',
        'fullscreen'
      ]
    });
  }
}
