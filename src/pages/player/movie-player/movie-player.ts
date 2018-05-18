import { Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, MenuController } from 'ionic-angular';

import Plyr from 'plyr';

import { BasePage } from '../../base/base';
import { MovieProvider as Movie } from '../../../providers/movie/movie';

@IonicPage({
  segment: 'play/movie/:id',
  defaultHistory: ['MoviesMoviesPage']
})
@Component({
  selector: 'page-movie-player',
  templateUrl: 'movie-player.html'
})
export class MoviePlayerPage extends BasePage {
  @ViewChild('video') video: ElementRef;

  movie: Movie;
  player: any;

  constructor(public injector: Injector, public menuCtrl: MenuController) {
    super(injector);

    this.movie = new Movie();
    this.movie.id = this.navParams.data.id;
  }

  async ionViewDidLoad() {
    try {
      this.showLoadingView('Loading...');
      await this.movie.fetch();
      this.showContentView();
      this.player = this.loadVideo(this.getMediaUrl('movies', this.movie.file));
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
    video.src = url;
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
