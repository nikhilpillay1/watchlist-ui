import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Subscription} from 'rxjs';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    Button
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  selectedUser?: string;
  private userSubscription!: Subscription;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.getUser().subscribe((user) => {
      this.selectedUser = user;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout() {
    this.router.navigate(["/login"]);
  }
}
