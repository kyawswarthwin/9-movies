import { Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import Plyr from 'plyr';
import Hls from 'hls.js';

import { BasePage } from '../../base/base';
import { StationProvider as Station } from '../../../providers/station/station';

@IonicPage({
  segment: 'stations/:id',
  defaultHistory: ['StationsPage']
})
@Component({
  selector: 'page-radio-player',
  templateUrl: 'radio-player.html'
})
export class RadioPlayerPage extends BasePage {
  @ViewChild('audio') audio: ElementRef;

  station: Station;
  hls: any;
  player: any;

  constructor(public injector: Injector) {
    super(injector);

    this.station = new Station();
    this.station.id = this.navParams.data.id;
  }

  async ionViewDidLoad() {
    try {
      this.showLoadingView('Loading...');
      await this.station.fetch();
      this.showContentView();
      this.player = this.loadAudio(this.station.url);
      this.player.play();
    } catch (error) {
      if (error.code === 101) {
        this.showEmptyView();
      } else {
        this.showErrorView();
      }
    }
  }

  ionViewWillLeave() {
    if (this.hls) this.hls.detachMedia();
  }

  loadAudio(url: string) {
    const audio = this.audio.nativeElement as HTMLAudioElement;
    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.loadSource(url);
      this.hls.attachMedia(audio);
    }
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
