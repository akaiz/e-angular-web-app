import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthComponent } from './auth.component';
describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let form: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    form = component.loginFormControls;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(form.email.valid).toBeFalsy();
    expect(form.password.valid).toBeFalsy();
  });

  it('Email field validity', () => {
    form.email.setValue('');
    expect(form.email.hasError('required')).toBeTruthy();
  });
  it('Login on correct details', () => {
    form.email.setValue('test@gmail.com');
    form.password.setValue('12345678');
    component.onLogin();
    expect(component.isLoginSubmitted).toEqual(true);
  });
});
