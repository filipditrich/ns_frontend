import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInterfaceComponent } from './dashboard-interface.component';

describe('DashboardInterfaceComponent', () => {
  let component: DashboardInterfaceComponent;
  let fixture: ComponentFixture<DashboardInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
