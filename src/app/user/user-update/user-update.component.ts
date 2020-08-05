import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  roles: Role[] = [
  
    {viewValue: 'Artist'},
    {viewValue: 'Designer'},
    {viewValue: 'Art Manager'}
];
  user= this.data;
  myForm: FormGroup;
  
  constructor( public dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.createForm();
  }
  
  createForm() :void {
  
    this.myForm = new FormGroup({
      firstName: new FormControl(this.user.firstName,[Validators.required]),
      lastName: new FormControl(this.user.lastName,[Validators.required]),
      email: new FormControl(this.user.email,[Validators.required,
                                              Validators.email]),
      role: new FormControl(this.user.role,[Validators.required]),
    })
    console.log(this.myForm.controls.role.value);
  }


  onSubmit() : void {
    this.user = {
      firstName: this.myForm.value.firstName,
      lastName: this.myForm.value.lastName,
      email: this.myForm.value.email,
      role: this.myForm.value.role
    }
    this.dialogRef.close(this.myForm.value);
  }

  onNoClick() : void {
    this.dialogRef.close();
  }


}
