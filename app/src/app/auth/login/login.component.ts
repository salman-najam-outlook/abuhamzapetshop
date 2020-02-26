import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NbLoginComponent, NbAuthService, NbAuthSocialLink } from '@nebular/auth';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent implements OnInit {
  constructor(private loginService: LoginService) {}
    redirectDelay: number;
    showMessages: any;
    strategy: string;
    errors: string[];
    messages: string[];
    user: any;
    submitted: boolean;
    socialLinks: NbAuthSocialLink[];
    rememberMe: boolean;
    form: FormGroup;

    getConfigValue(key: string): any {};
    login(): void {};

    ngOnInit() {
      this.form = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', Validators.required)
      })
  }

  onLoggedin() {
    this.loginService.onSignIn(this.form.value.email, this.form.value.password).subscribe(
      (response) => {
        console.log(response);
      },
      (errors) => {
        console.log(errors);
      }
    )
  }
}