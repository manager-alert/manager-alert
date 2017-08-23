import { InjectionToken } from '@angular/core';

export let CHECK_PERMISSION_PERIOD = new InjectionToken<number>('Interval in which the push notification permission is checked');
