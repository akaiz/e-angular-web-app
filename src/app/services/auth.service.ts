import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  BaseUrl = 'http://localhost:8000/api';

  public login(userInfo: User): Promise<any> {
    return new Promise((resolve, reject) => {
      const { email, password } = userInfo;
      axios
        .post(`${this.BaseUrl}/auth/login`, { email, password })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem('ACCESS_TOKEN', response.data.token);
            resolve('success');
          }
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 401) {
              reject(error.response.data.error);
            }
            if (error.response.status === 500) {
              reject('Server is down');
            }
          }
        });
    });
  }

  public register(userInfo: User): Promise<any> {
    return new Promise((resolve, reject) => {
      const { email, password, income, name } = userInfo;
      axios
        .post(`${this.BaseUrl}/auth/register`, { email, password, income, name })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem('ACCESS_TOKEN', response.data.token);
            resolve('success');
          }
        })
        .catch(error => {
          if (error.response && error.response.status === 500) {
            reject('Server is down');
          } else {
            reject(error.response.data.error);
          }
        });
    });
  }
  public userProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.isLoggedIn) {
        axios
          .get(`${this.BaseUrl}/profile`, { headers: { Authorization: ` Bearer ${this.getToken()}` } })
          .then(response => {
            if (response.data.user) {
              resolve(response.data.user);
            }
          })
          .catch(error => {
            if (error && error.response.status === 401) {
              reject(error.response.data.error);
            }
            if (error && error.response.status === 500) {
              reject('Server is down');
            }
          });
      }
    });
  }

  public isLoggedIn() {
    return this.getToken() !== null;
  }
  public getToken() {
    return localStorage.getItem('ACCESS_TOKEN');
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
