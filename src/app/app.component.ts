import { Component } from '@angular/core';
import { PushNotificationsService } from 'angular2-notifications';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase';

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
    private pushNotificationService: PushNotificationsService) {

    this.initAuthentification();
    pushNotificationService.requestPermission();

    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        this.swRegistrations = registrations;
        console.log(registrations);

        this.subscribeUser();

        for (const registration of this.swRegistrations) {
          registration.pushManager.getSubscription()
            .then(subscription => {
              const isSubscribed = subscription !== null;


              if (isSubscribed) {
                console.log('User IS subscribed.');
              } else {
                console.log('User is NOT subscribed.');
              }
            });
        }
      });
    }
  }

  /**
   * Reads the current user, or creates an anonymous login
   */
  private initAuthentification() {
    this.authState$ = this.angularFireAuth.authState;

    this.authState$.subscribe(state => console.log(state));

    // Create user on clients without token
    this.authState$
      .filter(state => state === null)
      .do(() => this.angularFireAuth.auth.signInAnonymously())
      .subscribe();
  }

  subscribeUser() {
    const publicKey = 'BOgxMhM2SDnBKhvWq9D5oYnzJTiHGQDk1zqkqCmyoqIjVpcYadi9_5s9S8Uoi-2Ry5_8AIF8YC2BQpTpBtMOQH0';
    const applicationServerKey = this.urlB64ToUint8Array(publicKey);
    for (const registration of this.swRegistrations) {
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
        .then(function (subscription) {
          console.log('User is subscribed.', subscription);
        })
        .catch(err => console.log('Failed to subscribe the user: ', err));
    }
  }

  private urlB64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
