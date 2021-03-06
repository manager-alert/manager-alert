import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { messaging } from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { CHECK_PERMISSION_PERIOD } from '../constants/check-permission-period';
import { READ_SERVICE_WORKER_REGISTRATION_PERIOD } from '../constants/read-service-worker-registration-period';
import { UserService } from './user.service';

@Injectable()
export class PushNotificationService {
  private messaging = messaging();
  private lastReadPermission$ = new BehaviorSubject<boolean>(undefined);
  private lastServiceWorkerRegistration$ = new BehaviorSubject<ServiceWorkerRegistration>(undefined);

  /** App is allowed to show push notifications */
  public readonly hasPermission$ = this.lastReadPermission$.distinctUntilChanged();
  /** Registered service worker */
  public readonly serviceWorkerRegistration$ = this.lastServiceWorkerRegistration$.distinctUntilChanged();
  /** Subscribed push token */
  public readonly pushToken$ = new BehaviorSubject<string>(undefined);

  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(CHECK_PERMISSION_PERIOD) checkPermissionPeriod: number,
    @Inject(READ_SERVICE_WORKER_REGISTRATION_PERIOD) checkServiceWorkerRegistrationPeriod: number) {

    this.startCheckingPermissionFrequently(checkPermissionPeriod);
    this.startCheckingServiceWorkerRegistrationFrequently(checkServiceWorkerRegistrationPeriod);
  }

  /**
   * Reads the service worker registrations and emits
   * the first registration to lastServiceWorkerRegistration$.
   */
  private readServiceWorkerRegistration() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations: ServiceWorkerRegistration[]) => this.lastServiceWorkerRegistration$.next(registrations[0]))
        .catch(err => this.lastServiceWorkerRegistration$.next(undefined));
    } else {
      this.router.navigate(['/not-supported']);
    }
  }

  /**
   * Checks if the app is allowed to show push notifications.
   * Emits to lastReadPermission$.
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

  /**
   * Frequently reads the service worker registrations.
   * @param period How long to wait until the next check in milliseconds
   */
  private startCheckingServiceWorkerRegistrationFrequently(period: number) {
    Observable
      .timer(0, period)
      .do(() => this.readServiceWorkerRegistration())
      .subscribe();
  }

  /**
   * Subscribes to push notifications
   */
  subscribeForPushNotifications() {
    return this.serviceWorkerRegistration$
      .filter(registration => !!registration)
      .do(registration => this.messaging.useServiceWorker(registration))
      .do(registration => registration.addEventListener('notificationclick', this.onNotificationClick))
      .switchMap(() => this.messaging.getToken())
      .do(token => this.pushToken$.next(token))
      .switchMap(token => this.userService.addPushSubscription(token));
  }

  private onNotificationClick(event) {
    window.open('https://google.com');
    event.notification.close();
  }
}
