import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  public loginForm: FormGroup;
  public submitMessage: string;

  constructor(private authService: AuthenticationService, private routerService: RouterService) {
    this.submitMessage = '';
  }
  ngOnInit(): void {
  }

  loginSubmit() {
    const user: any = { username: this.username.value, password: this.password.value };
    if (this.username.hasError('required') || this.password.hasError('required')) {
      this.submitMessage = 'Username and Password required';
    } else {
      this.authService.authenticateUser(user).subscribe(
        res => {
          this.authService.setBearerToken(res['token']);
          this.routerService.routeToDashboard();
        },
        err => {
          if (err.status === 404) {
            this.submitMessage = err.message;
          } else {
            this.submitMessage = err.error.message;
          }
        });
    }
  }
}
