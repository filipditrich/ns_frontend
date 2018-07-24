import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCredResetComponent } from './request-cred-reset.component';

describe('RequestCredResetComponent', () => {
  let component: RequestCredResetComponent;
  let fixture: ComponentFixture<RequestCredResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestCredResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCredResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
