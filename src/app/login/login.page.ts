import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from "axios";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form={
    email:"",
    password:""
  };
  authToken: any;

  constructor(private router: Router) {}

  async ionViewDidEnter() {
    const token = window.localStorage.getItem("token");
    this.authToken = token !== null ? JSON.parse(token) : null;
    if(this.authToken ){
      this.router.navigate(['/tabs/tab1']);
    }
  }

  ngOnInit() {
    this.ionViewDidEnter()
  }

  

  async signIn() {
    try {
    const response = await axios.post(`https://api-ydays.onrender.com/api/auth/login`, this.form)
    this.authToken=response.data
    window.localStorage.setItem("token",JSON.stringify(this.authToken))
    this.router.navigate(['/tabs/tab1']);
    } catch(error){
      console.error(error);
    };
  }

}
