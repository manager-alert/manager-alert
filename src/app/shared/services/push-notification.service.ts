import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { messaging } from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { CHECK_PERMISSION_PERIOD } from '../constants/check-permission-period';
import { READ_SERVICE_WORKER_REGISTRATION_PERIOD } from "../constants/read-service-worker-registration-period";

@Injectable()
export class PushNotificationService {
  private messaging = messaging();
  private lastReadPermission$ = new BehaviorSubject<boolean>(undefined);
  private lastServiceWorkerRegistration$ = new BehaviorSubject<ServiceWorkerRegistration>(undefined);

  /** App is allowed to show push notifications */
  public readonly hasPermission$ = this.lastReadPermission$.distinctUntilChanged();
  public readonly serviceWorkerRegistration$ = this.lastServiceWorkerRegistration$.distinctUntilChanged();

  constructor(
    @Inject(CHECK_PERMISSION_PERIOD) checkPermissionPeriod: number,
    @Inject(READ_SERVICE_WORKER_REGISTRATION_PERIOD) checkServiceWorkerRegistrationPeriod: number) {
    this.startCheckingPermissionFrequently(checkPermissionPeriod);
    this.startCheckingServiceWorkerRegistrationFrequently(checkServiceWorkerRegistrationPeriod);

    this.serviceWorkerRegistration$.do(console.log).subscribe();
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
      this.lastServiceWorkerRegistration$.next(undefined);
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
}
