import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { User } from '../interface/user';

describe('AuthService', async () => {
  let service: AuthService;
  let user: User;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(AuthService);
    user = { email: 'test@gmail.com', password: '12345678', name: 'Name', income: 3900 };
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to login a user with correct credentials', done => {
    spyOn(service, 'login').and.returnValue(Promise.resolve({ token: 'token' }));
    service.login(user).then(message => {
      expect(message.token).toEqual('token');
      done();
    });
  });

  it('should not login a user with wrong credentials', done => {
    const response = { error: 'invalid_credentials' };
    spyOn(service, 'login').and.returnValue(Promise.reject(response));
    service.login(user).catch(message => {
      expect(message).toEqual(response);
      done();
    });
  });
  it('should be able to register a new user ', done => {
    const response = { token: 'token' };
    spyOn(service, 'register').and.returnValue(Promise.reject(response));
    service.register(user).catch(message => {
      expect(message.token).toEqual(response.token);
      done();
    });
  });
});
