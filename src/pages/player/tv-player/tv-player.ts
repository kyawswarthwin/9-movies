import { Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, MenuController } from 'ionic-angular';

import Plyr from 'plyr';
import Hls from 'hls.js';

import { BasePage } from '../../base/base';
import { ChannelProvider as Channel } from '../../../providers/channel/channel';

@IonicPage({
  segment: 'play/tv/:id',
  defaultHistory: ['ChannelsPage']
})
@Component({
  selector: 'page-tv-player',
  templateUrl: 'tv-player.html'
})
export class TvPlayerPage extends BasePage {
  @ViewChild('video') video: ElementRef;

  channel: Channel;
  hls: any;
  player: any;

  constructor(public injector: Injector, public menuCtrl: MenuController) {
    super(injector);

    this.channel = new Channel();
    this.channel.id = this.navParams.data.id;
  }

  async ionViewDidLoad() {
    try {
      this.showLoadingView('Loading...');
      await this.channel.fetch();
      this.showContentView();
      this.player = this.loadVideo(this.channel.url);
      this.player.on('enterfullscreen', event => {
        this.menuCtrl.enable(false);
      });
      this.player.on('exitfullscreen', event => {
        this.menuCtrl.enable(true);
      });
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

  loadVideo(url: string) {
    const video = this.video.nativeElement as HTMLVideoElement;
    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.loadSource(url);
      this.hls.attachMedia(video);
    }
    return new Plyr(video, {
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
