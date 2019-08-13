import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  name = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.userProfile().then(data => {
      this.name = data.name;
    });
  }
  onLogOut() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
