import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { CHECK_PERMISSION_PERIOD } from './constants/check-permission-period';
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
        { provide: CHECK_PERMISSION_PERIOD, useValue: 10000 }
      ]
    };
  }
}
