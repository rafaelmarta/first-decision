import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import { NgxMaskService } from 'ngx-mask';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CountryService } from '../../services/country/country.service';
import { User } from '../../pages/users/users.types';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{

  userForm!: FormGroup;
  isExpanded: boolean = false;

  countrySelected: any = null;
  countriesList: any[] = [];

  public phoneMask: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

    public _dialogRef: MatDialogRef<UserFormComponent>,

    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _maskService: NgxMaskService,
    private _countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action)
  };

  initializeForm() {
    this.countrySelected = this._countryService.getDefaultCountry();

    if (!this.countrySelected) {
      throw new Error('País padrão não encontrado')
    }

    this.countriesList = this._countryService.getAllCountries();

    this.phoneMask = this.countrySelected.mask;

    this.userForm = this._formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[^@]+@[^@]+\.com$/)
      ]],
      profile: ['', Validators.required],
      language: ['portuguese', Validators.required],
      contactType: ['']
    });

    this.userForm.get('phone')?.setValue('');
  }

  onCountryChange(event: any): void {
    const country = event.value;
    this.countrySelected = country;
    this.setPhoneMask(country.code);
  }

  setPhoneMask(code: string): void {
    const country = this._countryService.getCountryByCode(code);
    if (country) {
      this.phoneMask = country.mask;
      this.userForm.get('phone')?.setValue('');
    }
  }

  onClose(): void {
    if (this.userForm.dirty) {
      const ref = this._dialog.open(ConfirmDialogComponent);
      ref.afterClosed().subscribe(result => {
        if (result) {
          this._dialogRef.close();
        }
      })
    } else {
      this._dialogRef.close();
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      const newUser: User = {
        avatar: null,
        name: this.userForm.get('name')?.value,
        lastName: this.userForm.get('lastName')?.value,
        phone: this.userForm.get('phone')?.value,
        email: this.userForm.get('email')?.value,
        profile: this.userForm.get('profile')?.value,
        language: this.userForm.get('language')?.value,
        contactType: this.userForm.get('contactType')?.value,
        status: 'Pendente',
        creationDate: new Date(),
        lastAccess: null
      };

      const users = JSON.parse(localStorage.getItem('Users') || '[]');

      users.push(newUser);

      localStorage.setItem('Users', JSON.stringify(users));

      this._dialogRef.close();
      this.openSnackBar('Convite enviado com sucesso', 'Fechar');
    }
  }
}
