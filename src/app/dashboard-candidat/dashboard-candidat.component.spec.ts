import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCandidatComponent } from './dashboard-candidat.component';

describe('DashboardCandidatComponent', () => {
  let component: DashboardCandidatComponent;
  let fixture: ComponentFixture<DashboardCandidatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCandidatComponent]
    });
    fixture = TestBed.createComponent(DashboardCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
