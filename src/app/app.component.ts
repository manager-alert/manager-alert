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
}
