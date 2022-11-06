import { Component } from '@angular/core';
// this comments for test auth-interceptor, should delete
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent /* implements OnInit */ {
  title = 'project-management-app';

  /*  constructor(private store: Store, private usersApiService: UsersApiService) {
  }

  ngOnInit() {
    this.usersApiService.getUsers().subscribe(console.log);
  } */
}
