import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredResetComponent } from './cred-reset.component';

describe('CredResetComponent', () => {
  let component: CredResetComponent;
  let fixture: ComponentFixture<CredResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
