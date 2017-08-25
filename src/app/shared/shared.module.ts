import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CHECK_PERMISSION_PERIOD } from './constants/check-permission-period';
import { PUSH_NOTIFICATION_PUBLIC_KEY } from './constants/push-notification-public-key';
import { READ_SERVICE_WORKER_REGISTRATION_PERIOD } from './constants/read-service-worker-registration-period';
import { PushNotificationService } from './services/push-notification.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        PushNotificationService,
        { provide: CHECK_PERMISSION_PERIOD, useValue: 10000 },
        { provide: READ_SERVICE_WORKER_REGISTRATION_PERIOD, useValue: 30000 },
        {
          provide: PUSH_NOTIFICATION_PUBLIC_KEY,
          useValue: 'BJIzrqBhVEYKWoTmEyjAHG5D2nW6Fl2FrB_9h-ueopO528-jBYRfzMIS2t1rJsAv01P1wOtt2A5XegnaChNJ5v8'
        }
      ]
    };
  }
}
