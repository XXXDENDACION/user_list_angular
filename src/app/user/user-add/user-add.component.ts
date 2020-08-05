import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  roles: Role[] = [
  
    {viewValue: 'Artist'},
    {viewValue: 'Designer'},
    {viewValue: 'Art Manager'}
];
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  };
  myForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserAddComponent>,
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
