import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPlayerPageComponent } from './select-player-page.component';

describe('SelectPlayerPageComponent', () => {
  let component: SelectPlayerPageComponent;
  let fixture: ComponentFixture<SelectPlayerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPlayerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPlayerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
