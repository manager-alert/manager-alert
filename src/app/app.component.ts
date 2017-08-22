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

  constructor(
    private angularFireAuth: AngularFireAuth,
    private pushNotificationService: PushNotificationsService) {

    this.initAuthentification();
    pushNotificationService.requestPermission();
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
