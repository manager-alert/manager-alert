import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdButtonModule, MdIconModule, MdToolbarModule } from '@angular/material';

import { ToolbarComponent } from './toolbar.component';
import { ToolbarService } from './toolbar.service';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [
        MdButtonModule,
        MdIconModule,
        MdToolbarModule
      ],
      providers: [ToolbarService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
