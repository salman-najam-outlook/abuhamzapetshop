import { Component, OnInit } from '@angular/core';
import { NbAuthSocialLink } from '@nebular/auth';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router, private toastrService: NbToastrService) { }
  redirectDelay: number;
  showMessages: any;
  strategy: string;
  errors: string[];
  messages: string[];
  user: User;
  submitted: boolean;
  socialLinks: NbAuthSocialLink[];
  rememberMe: boolean;
  form: FormGroup;

  // Toaster Setting Starts
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  // Toaster Setting Ends

  getConfigValue(key: string): any { }
  login(): void { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onLoggedin() {
    this.loginService.onSignIn(this.form.value.email, this.form.value.password).subscribe(
      (response) => {
        this.showToast('success', 'Success!', 'You have logged in successfully!');
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('expires', response.expires_in);
        this.loginService.getLoggedInUserClaims().subscribe(
          response => {
            this.user = response;
            localStorage.setItem('user', JSON.stringify(this.user));
            this.user = JSON.parse(localStorage.getItem('user'));
            if (this.user.userRoll === 'admin') {
              this.router.navigate(['pages/reports/dashboard']);
            } else if (this.user.userRoll === 'emp') {
              this.router.navigate(['pages/products/sales']);
            } else {
              this.router.navigate(['auth']);
            }
          },
          error => {
            this.showToast('danger', 'Error!', 'An error occured while fetching your details!');
          },
        ),
          error => {
            this.showToast('danger', 'Error!', 'Network Error... Please try later!');
          };
      },
      (errors) => {
        if (errors.status === 400) {
          this.showToast('danger', 'Error!', 'Invalid Email or Password!');
        } else {
          this.showToast('danger', 'Error!', 'Network Error... Please try later!');
        }
      },
    );
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
