import { Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, MenuController } from 'ionic-angular';

import Plyr from 'plyr';
import Hls from 'hls.js';

import { BasePage } from '../../base/base';
import { ChannelProvider as Channel } from '../../../providers/channel/channel';

@IonicPage({
  segment: 'channels/:id',
  defaultHistory: ['ChannelsPage']
})
@Component({
  selector: 'page-tv-player',
  templateUrl: 'tv-player.html'
})
export class TvPlayerPage extends BasePage {
  @ViewChild('video') video: ElementRef;

  channel: Channel;
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

  loadVideo(url: string) {
    const video = this.video.nativeElement as HTMLVideoElement;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
    }
    return new Plyr(video, { iconUrl: 'assets/imgs/plyr.svg' });
  }
}
