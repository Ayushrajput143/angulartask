import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UsersService]
})
export class RegisterComponent {
  
regform: FormGroup;








constructor(private _fb:FormBuilder,
   private _usersService:UsersService, 
   private _dialogref:MatDialogRef<RegisterComponent>, private router: Router ) {
  this.regform= this._fb.group({
    firstName:this._fb.control('',[Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]),
    lastName: this._fb.control('',Validators.required),
    mobile:this._fb.control('',[ Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
    email:this._fb.control('',[Validators.required, Validators.email]) ,
    age: '',
    image:['', Validators.required],
    country:'',
    state:'',
    addressType: [],
    address1: [],
    address2: [],
    companyAddress1: [],
    companyAddress2: [],
    interests:[this.interests],
  });
 

}



countries = ['India', 'USA', 'UAE'];
// States
states: { [key: string]: string[] } = {
  India: ['Maharashtra', 'Delhi', 'Bangalore'],
  USA: ['California', 'New York', 'Texas'],
  UAE: ['Dubai', 'Abu Dhabi', 'Sharjah'],
};


onSubmit(){
  if(this.regform.valid){
    this._usersService.addUsers(this.regform.value).subscribe({
      next:(val:any)=>{
        alert('User added sucessfull');
        this._dialogref.close();
        this.router.navigateByUrl('/profile');
    },
    error:(err:any) => {
      console.error(err)
    },
    
  });
  }
}


onChangeCountry(event: Event): void {
  const selectedCountry = (event.target as HTMLSelectElement).value;
  if (selectedCountry) {
    this.regform.get('state')?.reset();
  }
}

 // Function to check if "Home" address type is selected
 isHomeAddressSelected(): boolean {
  return this.regform.get('addressType')?.value === 'home';
}

// Function to check if "Company" address type is selected
isCompanyAddressSelected(): boolean {
  return this.regform.get('addressType')?.value === 'company';
}

// Function to handle address type change event
onAddressTypeChange(event: Event): void {
  const addressType = (event.target as HTMLSelectElement).value;
  if (addressType === 'home') {
    this.regform.get('companyAddress1')?.reset();
    this.regform.get('companyAddress2')?.reset();
  } else if (addressType === 'company') {
    this.regform.get('address1')?.reset();
    this.regform.get('address2')?.reset();
  }
}


interests: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;

  addInterest(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.interests.push(value);
    }
    event.input.value = '';
  }

  removeInterest(interest: string): void {
    const index = this.interests.indexOf(interest);
    if (index !== -1) {
      this.interests.splice(index, 1);
    }
  }

  closeDialog(): void {
    this._dialogref.close();
  }

  showError: boolean = false;



formatLabel(value: number): string {
  if (value >= 1000) {
    return Math.round(value / 1000) + 'k';
  }

  return `${value}`;
}


// onSubmit() {
//   if (this.regform.valid) {

//     // Save user data to the server using ServerService
//     this._usersService.addUsers(this.regform.value).subscribe(
//       (response) => {
//         console.log('User data saved successfully:', response);
//         this.router.navigateByUrl('/profile');
//       },
//       (error) => {
//         console.error('Error saving user data:', error);
//         // Handle error as needed
//       }
//     );
//   } else {
//     this.regform.markAllAsTouched();
//     this.showError = true;
//   }
// }
url = 'https://th.bing.com/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?w=181&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7';
onSelect(event: any) {
  let fileType = event.target.files[0].type;
  if (fileType.match(/image\/*/)) {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };
  } else {
    window.alert('Please select correct image format');
  }
}
}
	







