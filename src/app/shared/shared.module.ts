import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth/auth.module';
import { AngularFireDatabaseModule } from 'angularfire2/database/database.module';

import { CHECK_PERMISSION_PERIOD } from './constants/check-permission-period';
import { READ_SERVICE_WORKER_REGISTRATION_PERIOD } from './constants/read-service-worker-registration-period';
import { PushNotificationService } from './services/push-notification.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
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
        UserService,
        { provide: CHECK_PERMISSION_PERIOD, useValue: 10000 },
        { provide: READ_SERVICE_WORKER_REGISTRATION_PERIOD, useValue: 30000 }
      ]
    };
  }
}
