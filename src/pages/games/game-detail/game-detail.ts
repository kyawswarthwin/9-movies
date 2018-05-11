import { Component, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage } from 'ionic-angular';

import 'rxjs/add/operator/first';

import { BasePage } from '../../base/base';
import { GameProvider as Game } from '../../../providers/game/game';

@IonicPage({
  segment: 'games/:id',
  defaultHistory: ['GamesPage']
})
@Component({
  selector: 'page-game-detail',
  templateUrl: 'game-detail.html'
})
export class GameDetailPage extends BasePage {
  game: Game;
  review: string = '';

  constructor(public injector: Injector, public http: HttpClient) {
    super(injector);

    this.game = new Game();
    this.game.id = this.navParams.data.id;
  }

  async ionViewDidLoad() {
    try {
      this.showLoadingView('Loading...');
      await this.game.fetch();
      await this.http
        .get(this.getDownloadUrl('games', `${this.game.file.split('.')[0]}.html`), {
          responseType: 'text'
        })
        .first()
        .toPromise()
        .then(data => (this.review = data))
        .catch(console.error);
      this.showContentView();
    } catch (error) {
      if (error.code === 101) {
        this.showEmptyView();
      } else {
        this.showErrorView();
      }
    }
  }
}
