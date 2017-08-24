import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { CHECK_PERMISSION_PERIOD } from './constants/check-permission-period';
import { READ_SERVICE_WORKER_REGISTRATION_PERIOD } from './constants/read-service-worker-registration-period';
import { PushNotificationService } from './services/push-notification.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        PushNotificationService,
        { provide: CHECK_PERMISSION_PERIOD, useValue: 10000 },
        { provide: READ_SERVICE_WORKER_REGISTRATION_PERIOD, useValue: 30000 }
      ]
    };
  }
}
