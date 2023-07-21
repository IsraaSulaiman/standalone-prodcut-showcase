import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: { email: string; password: string } = {
    email: 'john@mail.com',
    password: 'changeme',
  };

  constructor(private auth: AuthService, private router: Router) {
  }

  onSubmit() {
    this.auth.login(this.login).subscribe(data => {
      this.router.navigate(['/products'])
    });
  }
}
