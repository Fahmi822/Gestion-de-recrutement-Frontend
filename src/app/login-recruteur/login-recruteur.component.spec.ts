import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRecruteurComponent } from './login-recruteur.component';

describe('LoginRecruteurComponent', () => {
  let component: LoginRecruteurComponent;
  let fixture: ComponentFixture<LoginRecruteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRecruteurComponent]
    });
    fixture = TestBed.createComponent(LoginRecruteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});