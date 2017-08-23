import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { messaging } from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { CHECK_PERMISSION_PERIOD } from '../constants/check-permission-period';

@Injectable()
export class PushNotificationService {
  private messaging = messaging();
  private lastReadPermission$ = new BehaviorSubject<boolean>(undefined);

  /** App is allowed to show push notifications */
  public readonly hasPermission$ = this.lastReadPermission$.distinctUntilChanged();

  constructor( @Inject(CHECK_PERMISSION_PERIOD) period) {
    // Check permission to show push notifications every 10 seconds
    this.startCheckingPermissionFrequently(period);
  }

  /**
   * Checks if the app is allowed to show push notifications.
   * Emits the global observable hasPermission$.
   */
  private checkPermission() {
    this.messaging.requestPermission()
      .then(() => this.lastReadPermission$.next(true))
      .catch(err => this.lastReadPermission$.next(false));
  }

  /**
   * Frequently checks if the app is allowed to show push notifications.
   * @param period How long to wait until the next check in milliseconds
   */
  private startCheckingPermissionFrequently(period: number) {
    Observable
      .timer(0, period)
      .do(() => this.checkPermission())
      .subscribe();
  }
}
