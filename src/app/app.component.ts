import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private authState$: Observable<User>;

  constructor(angularFireAuth: AngularFireAuth) {
    this.authState$ = angularFireAuth.authState;

    this.authState$.subscribe(state => console.log(state));

    this.authState$
      .filter(state => state === null)
      .do(() => angularFireAuth.auth.signInAnonymously())
      .subscribe();
  }
}
