import { Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import Plyr from 'plyr';

import { BasePage } from '../../base/base';
import { MusicProvider as Music } from '../../../providers/music/music';

@IonicPage({
  segment: 'musics/:id',
  defaultHistory: ['MusicPage']
})
@Component({
  selector: 'page-music-player',
  templateUrl: 'music-player.html'
})
export class MusicPlayerPage extends BasePage {
  @ViewChild('audio') audio: ElementRef;

  song: Music;
  player: any;

  constructor(public injector: Injector) {
    super(injector);

    this.song = new Music();
    this.song.id = this.navParams.data.id;
  }

  async ionViewDidLoad() {
    try {
      this.showLoadingView('Loading...');
      await this.song.fetch();
      this.showContentView();
      this.player = this.loadAudio(this.getDownloadUrl('music', this.song.file));
      this.player.play();
    } catch (error) {
      if (error.code === 101) {
        this.showEmptyView();
      } else {
        this.showErrorView();
      }
    }
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
