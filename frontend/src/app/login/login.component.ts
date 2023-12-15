import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    name: '',
    password: '',
  };
  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}

  // formSubmit()
  // {
  //   console.log("btn is click");
  //   if(this.loginData.name.trim()==''|| this.loginData.name==null)
  //   {
  //          this.snack.open('username is required!!','',{
  //           duration: 3000,
  //          });
  //          return;
  //   }

  //   if(this.loginData.password.trim()==''|| this.loginData.password==null)
  //   {
  //          this.snack.open('password is required!!','',{
  //           duration: 3000,
  //          });
  //          return;
  //   }

  //   //request server to generate token

  //   this.login.generateToken(this.loginData).subscribe((data:any)=>{

  //   });

  // }

  formSubmit() {
    console.log('login btn click');

    if (this.loginData.name.trim() == '' || this.loginData.name == null) {
      this.snack.open('username is required!!', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('password is required!!', '', {
        duration: 3000,
      });
      return;
    }

    //request Server to generate Token

    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);
        //login...

        this.login.loginUser(data.jwtToken);

        console.log('login');

        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);
          //redirect to groups

          this.router.navigate(['groups']);
        });
      },
      (error) => {
        console.log('Error !');
        console.log(error);
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        });
      }
    );
  }

  //clear fuction
  clear() {
    console.log('clear is working');

    this.loginData = {
      name: '',
      password: '',
    };
  }
}
