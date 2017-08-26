import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase) { }

  /**
   * Saves the token to the current user, for receiving push notifications
   * @param token Token to identitfy the client for push notifications
   */
  addPushSubscription(token: string) {
    return this.auth.authState
      .filter(state => !!state)
      .map(state => state.uid)
      .switchMap(uid => this.db.object(`users/${uid}/push-subscriptions/${token}`).set(true));
  }

}
