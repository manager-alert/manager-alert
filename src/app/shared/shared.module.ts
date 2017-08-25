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
          useValue: 'BOgxMhM2SDnBKhvWq9D5oYnzJTiHGQDk1zqkqCmyoqIjVpcYadi9_5s9S8Uoi-2Ry5_8AIF8YC2BQpTpBtMOQH0'
        }
      ]
    };
  }
}
