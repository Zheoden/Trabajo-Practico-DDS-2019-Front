import { Usuario } from './../modelo/interfaces';
import { Component} from '@angular/core';
import { UserService } from '../api/userService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent {
  public username = '';
  public password = '';
  public user: Usuario;
  public typePassword = 'password';
  public validate = false;
  public required = false;

  constructor(private userService: UserService, private router: Router) {}

  userChange() {
    this.required = Boolean(this.username && this.password);
  }

  passChange() {
    this.required = Boolean(this.username && this.password);
  }

  onLogin() {
    return this.userService
      .validateLogin(this.username, this.password)
      .then((user: boolean) => {
        this.router.navigate(['/home'], {
          state: { user }
        });
      })
      .catch(error => {
        this.validate = true;
        console.log(error);
      });
  }
}

