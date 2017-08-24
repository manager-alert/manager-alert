import { InjectionToken } from '@angular/core';

const descriptions = 'Interval in which the service worker registration is read';
export let READ_SERVICE_WORKER_REGISTRATION_PERIOD = new InjectionToken<number>(descriptions);
