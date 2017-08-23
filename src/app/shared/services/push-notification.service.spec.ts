import { inject, TestBed } from '@angular/core/testing';
import * as firebase from 'firebase';

import { CHECK_PERMISSION_PERIOD } from '../constants/check-permission-period';
import { PushNotificationService } from './push-notification.service';

describe('PushNotificationService', () => {
  firebase.initializeApp({ messagingSenderId: 'dummy' });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PushNotificationService,
        { provide: CHECK_PERMISSION_PERIOD, useValue: 100 }
      ]
    });
  });

  it('should be created', inject([PushNotificationService], (service: PushNotificationService) => {
    expect(service).toBeTruthy();
  }));

  it('should be false', inject([PushNotificationService], (service: PushNotificationService) => {
    return service.hasPermission$.subscribe(result => {
      expect(result).toBeFalsy();
    });
  }));
});
