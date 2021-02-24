import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { slideInAnimation } from './app.animation';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService,
              private router: Router) {
                router.events.subscribe((routerEvent: Event) => {
                  this.checkRouterEvent(routerEvent);
                })
               }

  checkRouterEvent(event: Event) {
    if (event instanceof NavigationStart){
      this.loading = true;
    }
    
    if (event instanceof NavigationEnd ||
        event instanceof NavigationError ||
        event instanceof NavigationCancel) {
      this.loading = false;
    }
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigateByUrl('/welcome');
  }
}
