import { APP_BASE_HREF } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { PushNotificationService } from './shared/services/push-notification.service';

const angularFireAuthMock = {
  app: undefined,
  auth: {
    signInAnonymously: () => { }
  },
  authState: Observable.of(null)
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LayoutModule.forRoot(),
        RouterModule.forRoot([])
      ],
      declarations: [
        AppComponent
      ], providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: AngularFireAuth, useValue: angularFireAuthMock },
        { provide: PushNotificationService, useValue: {} }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render a toolbar', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-toolbar')).toBeTruthy();
  }));
});
