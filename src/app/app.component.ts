import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs/Observable';

import { PushNotificationService } from './shared/services/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private authState$: Observable<User>;
  private swRegistrations: ServiceWorkerRegistration[];

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private pushNotificationService: PushNotificationService) {

    this.initAuthentification();
    this.subscribeForPushNotifications();
  }

  /**
   * Reads the current user, or creates an anonymous login
   */
  private initAuthentification() {
    this.authState$ = this.auth.authState;

    // Create user on clients without token
    this.authState$
      .filter(state => state === null) // only unregistered users
      .do(() => this.auth.auth.signInAnonymously())
      .subscribe();
  }

  /**
   * Subscribes for push notifications
   */
  private subscribeForPushNotifications() {
    this.pushNotificationService.subscribeForPushNotifications()
      .subscribe();
  }

  test() {
    this.db.list('news').push({
      title: 'test',
      link: 'https://www.ligainsider.de/christian-pulisic_6279/trainingsrueckkehr-am-montag-219390/',
      players: {
        6279: true
      }
    }).then(console.log);
  }
}
