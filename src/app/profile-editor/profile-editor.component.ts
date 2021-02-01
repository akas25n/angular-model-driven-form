import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],

      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      }),

      aliases: this.fb.array([])
    });

  }

  ngOnInit(): void {}


  get aliases() {
    return this.form.get('aliases') as FormArray;
  }

  addAlias() {
    const als= this.form.controls.aliases as FormArray;

    als.push(this.fb.group({
      key : '',
      value: '',
    }));
  }

  deleteAlias(index) {
   this.aliases.removeAt(index);
  }

  updateProfile() {
    this.form.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.form.value);
  }
}
