import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotSupportedPageComponent } from './not-supported-page.component';

describe('NotSupportedPageComponent', () => {
  let component: NotSupportedPageComponent;
  let fixture: ComponentFixture<NotSupportedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotSupportedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotSupportedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
