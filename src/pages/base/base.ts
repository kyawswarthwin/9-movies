import { Injector } from '@angular/core';
import {
  NavController,
  NavParams,
  ModalController,
  ViewController,
  LoadingController,
  AlertController
} from 'ionic-angular';

export abstract class BasePage {
  public isLoadingView: boolean;
  public isEmptyView: boolean;
  public isContentView: boolean;
  public isErrorView: boolean;

  protected navCtrl: NavController;
  protected navParams: NavParams;
  protected refresher: any;
  protected infiniteScroll: any;

  private modalCtrl: ModalController;
  private viewCtrl: ViewController;
  private loadingCtrl: LoadingController;
  private loading: any;
  private alertCtrl: AlertController;

  constructor(public injector: Injector) {
    this.navCtrl = injector.get(NavController);
    this.navParams = injector.get(NavParams);
    this.modalCtrl = injector.get(ModalController);
    this.viewCtrl = injector.get(ViewController);
    this.loadingCtrl = injector.get(LoadingController);
    this.alertCtrl = injector.get(AlertController);
  }

  showLoadingView(message?: string) {
    this.isLoadingView = true;
    this.isEmptyView = false;
    this.isContentView = false;
    this.isErrorView = false;

    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  showEmptyView() {
    this.isLoadingView = false;
    this.isEmptyView = true;
    this.isContentView = false;
    this.isErrorView = false;

    this.loading.dismiss();
  }

  showContentView() {
    this.isLoadingView = false;
    this.isEmptyView = false;
    this.isContentView = true;
    this.isErrorView = false;

    this.loading.dismiss();
  }

  showErrorView() {
    this.isLoadingView = false;
    this.isEmptyView = false;
    this.isContentView = false;
    this.isErrorView = true;

    this.loading.dismiss();
  }

  onRefreshComplete(data?: any) {
    if (this.refresher) {
      this.refresher.complete();
    }

    if (this.infiniteScroll) {
      this.infiniteScroll.complete();
      if (data && data.length > 0) {
        this.infiniteScroll.enable(true);
      } else {
        this.infiniteScroll.enable(false);
      }
    }
  }

  showAlert(message: string, title?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: [
          {
            text: 'OK',
            handler: resolve
          }
        ]
      });
      alert.present();
    });
  }

  showPrompt(message: string, inputs: any[], title?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: title,
        message: message,
        inputs: inputs,
        buttons: [
          {
            text: 'OK',
            handler: data => {
              resolve(data);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              resolve(null);
            }
          }
        ]
      });
      alert.present();
    });
  }

  showConfirm(message: string, title?: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              resolve(true);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          }
        ]
      });
      alert.present();
    });
  }

  showModal(component: any, data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let modal = this.modalCtrl.create(component, data);
      modal.onDidDismiss(resolve);
      modal.present();
    });
  }

  closeModal(data?: any) {
    this.viewCtrl.dismiss(data);
  }
}
