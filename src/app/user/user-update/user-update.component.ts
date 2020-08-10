import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import {roles} from '../../const/roles';


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  
  roles = roles;
  users: User[];
  freeArtManage: boolean;
  user= this.data.user
  myForm: FormGroup;
  showMessage = false;
  title =(Object.keys(this.user).length) ? "Update User" : "Add User"
  
  
  constructor( public dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.createForm();
  }

  onChange(event) {
    console.log(event.value);
    if(event.value === "Art Manager" && this.freeArtManage) {
      this.showMessage = true;
    }
    else this.showMessage = false;
  } 

  createForm() :void {
  
    this.myForm = new FormGroup({
      firstName: new FormControl(this.user.firstName,[Validators.required]),
      lastName: new FormControl(this.user.lastName,[Validators.required]),
      email: new FormControl(this.user.email,[Validators.required,
                                              Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
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
