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
    private angularFireAuth: AngularFireAuth,
    private pushNotificationService: PushNotificationService) {

    this.initAuthentification();
    this.subscribeForPushNotifications();
  }

  /**
   * Reads the current user, or creates an anonymous login
   */
  private initAuthentification() {
    this.authState$ = this.angularFireAuth.authState;

    // Create user on clients without token
    this.authState$
      .filter(state => state === null) // only unregistered users
      .do(() => this.angularFireAuth.auth.signInAnonymously())
      .subscribe();
  }

  /**
   * Subscribes for push notifications
   */
  private subscribeForPushNotifications() {
    this.authState$
      .filter(state => !!state) // only registered users
      .switchMap(state => this.pushNotificationService.subscribeForPushNotifications())
      .subscribe();
  }
}
