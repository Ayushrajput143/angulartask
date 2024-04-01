import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { EditComponent } from '../edit/edit.component';
import { RegisterComponent } from '../register/register.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: any;
  private _dialog: any;

  constructor(private ss: UsersService) {}




  ngOnInit(): void {
    // Retrieve user data from the server
    this.ss.getUsers().subscribe(
      (userData: any) => {
        if (Array.isArray(userData)) {
          this.userData =
            userData.length > 0 ? userData[userData.length - 1] : null;
        } else {
          this.userData = userData;
        }
        console.log('User data received:', this.userData); 
      },
      (error) => {
        console.error('Error retrieving user data:', error);
        // Handle error as needed
      }
    );
  }
 
 

}