import {Component, OnInit} from '@angular/core';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-login-page',
  imports: [
    DropdownModule,
    FormsModule,
    Card,
    Button,
    Select
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
  }

  users: string[] = [];
  selectedUser?: string;

  ngOnInit() {
    this.users = [
      "Nikhil",
      "Reon",
      "Nishen",
      "Shannen",
      "Yuvi",
      "Kavs",
      "Nori",
      "Tahil",
    ];

    this.selectedUser = undefined;
    this.userService.clearUser();
    console.log("clearing user");
  }

  login(selectedUser: string) {
    this.userService.setUser(selectedUser);
    this.router.navigate(["/movies"]);
  }
}
