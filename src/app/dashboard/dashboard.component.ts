import { Component, OnInit } from '@angular/core';
import { Users } from '../users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: Users[] = [];

  constructor(private ss: UsersService) {}

  ngOnInit(): void {
    this.ss.getUsers().subscribe((u) => {
      this.user = u as Users[];
    });
  }

  onDelete(id: string) {
    console.log(id);
    this.ss.deleteDetails(id).subscribe(() => {
      this.ss.getUsers().subscribe((u) => {
        alert('User Deleted Successfully');
        this.user = u as Users[];
      });
    });
  }
}
