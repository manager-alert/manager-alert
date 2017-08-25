import { InjectionToken } from '@angular/core';

export let PUSH_NOTIFICATION_PUBLIC_KEY = new InjectionToken<string>('Public key to receive push notifications');
