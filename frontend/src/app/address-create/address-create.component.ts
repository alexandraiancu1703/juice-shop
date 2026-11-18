/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

<<<<<<< HEAD
import { Component, type OnInit, DestroyRef, inject, signal, ChangeDetectionStrategy } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { form, FormField, FormRoot } from '@angular/forms/signals'
import { catchError, EMPTY, firstValueFrom, of, switchMap } from 'rxjs'
import { addressFormSchema, type AddressFormModel, MAX_MOBILE_NUMBER, MAX_STREET_ADDRESS_LENGTH, MAX_ZIP_CODE_LENGTH, MIN_MOBILE_NUMBER } from '../Models/address-form.schema'
=======
import { UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Component, type OnInit, inject, ChangeDetectionStrategy } from '@angular/core'
>>>>>>> main
import { AddressService } from '../Services/address.service'
import { ActivatedRoute, type ParamMap, Router } from '@angular/router'
import { Location } from '@angular/common'
import { TranslateService, TranslateModule } from '@ngx-translate/core'
import { SnackBarHelperService } from '../Services/snack-bar-helper.service'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule, MatLabel, MatError, MatHint } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.scss'],
<<<<<<< HEAD
  imports: [MatCardModule, TranslateModule, MatFormFieldModule, MatLabel, MatInputModule, FormRoot, FormField, MatError, MatHint, MatButtonModule, MatIconModule]
=======
  imports: [MatCardModule, TranslateModule, MatFormFieldModule, MatLabel, MatInputModule, FormsModule, ReactiveFormsModule, MatError, MatHint, MatButtonModule, MatIconModule]
>>>>>>> main
})
export class AddressCreateComponent implements OnInit {
  private readonly location = inject(Location)
  private readonly addressService = inject(AddressService)
  private readonly router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  private readonly translate = inject(TranslateService)
  private readonly snackBarHelperService = inject(SnackBarHelperService)
<<<<<<< HEAD
  private readonly destroyRef = inject(DestroyRef)

  public readonly maxZipCodeLength = MAX_ZIP_CODE_LENGTH
  public readonly maxStreetAddressLength = MAX_STREET_ADDRESS_LENGTH
  public readonly mobileNumberRange = `${MIN_MOBILE_NUMBER}-${MAX_MOBILE_NUMBER}`

  private readonly initialModel: AddressFormModel = {
    country: '',
    fullName: '',
    mobileNum: null,
    zipCode: '',
    streetAddress: '',
    city: '',
    state: ''
  }

  public readonly addressModel = signal<AddressFormModel>({ ...this.initialModel })

  public readonly addressForm = form(this.addressModel, addressFormSchema, {
    submission: {
      action: () => this.save()
    }
  })

=======

  public countryControl: UntypedFormControl = new UntypedFormControl('', [Validators.required])
  public nameControl: UntypedFormControl = new UntypedFormControl('', [Validators.required])
  public numberControl: UntypedFormControl = new UntypedFormControl('', [Validators.required, Validators.min(1111111), Validators.max(9999999999)])
  public pinControl: UntypedFormControl = new UntypedFormControl('', [Validators.required, Validators.maxLength(8)])
  public addressControl: UntypedFormControl = new UntypedFormControl('', [Validators.required, Validators.maxLength(160)])
  public cityControl: UntypedFormControl = new UntypedFormControl('', [Validators.required])
  public stateControl: UntypedFormControl = new UntypedFormControl()
  public address: any = undefined
>>>>>>> main
  public mode = 'create'
  private addressId: string = undefined

  ngOnInit (): void {
<<<<<<< HEAD
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap: ParamMap) => {
          if (!paramMap.has('addressId')) {
            this.mode = 'create'
            this.addressId = null
            return of(null)
          }
          this.mode = 'edit'
          this.addressId = paramMap.get('addressId')
          return this.addressService.getById(this.addressId).pipe(
            catchError((err) => {
              console.log(err)
              return EMPTY
            })
          )
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((address) => {
        if (address) {
          this.initializeForm(address)
        }
      })
  }

  async save () {
    const address = { ...this.addressModel() }
    const confirmationKey = this.mode === 'edit' ? 'ADDRESS_UPDATED' : 'ADDRESS_ADDED'
    try {
      const savedAddress = this.mode === 'edit'
        ? await firstValueFrom(this.addressService.put(this.addressId, address))
        : await firstValueFrom(this.addressService.save(address))
      this.resetForm()
      this.routeToPreviousUrl()
      this.snackBarHelperService.open(await this.confirmationMessage(confirmationKey, savedAddress?.city), 'confirmBar')
    } catch (err: any) {
      this.snackBarHelperService.open(err.error?.error, 'errorBar')
=======
    this.address = {}
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('addressId')) {
        this.mode = 'edit'
        this.addressId = paramMap.get('addressId')
        this.addressService.getById(this.addressId).subscribe((address) => {
          this.initializeForm(address)
        })
      } else {
        this.mode = 'create'
        this.addressId = null
      }
    })
  }

  save () {
    this.address.country = this.countryControl.value
    this.address.fullName = this.nameControl.value
    this.address.mobileNum = this.numberControl.value
    this.address.zipCode = this.pinControl.value
    this.address.streetAddress = this.addressControl.value
    this.address.city = this.cityControl.value
    this.address.state = this.stateControl.value
    if (this.mode === 'edit') {
      this.addressService.put(this.addressId, this.address).subscribe({
        next: (savedAddress) => {
          this.address = {}
          this.ngOnInit()
          this.resetForm()
          this.routeToPreviousUrl()
          this.translate.get('ADDRESS_UPDATED', { city: savedAddress.city }).subscribe({
            next: (addressUpdated) => {
              this.snackBarHelperService.open(addressUpdated, 'confirmBar')
            },
            error: (translationId) => {
              this.snackBarHelperService.open(translationId, 'confirmBar')
            }
          })
        },
        error: (err) => {
          this.snackBarHelperService.open(err.error?.error, 'errorBar')
          this.address = {}
          this.resetForm()
        }
      })
    } else {
      this.addressService.save(this.address).subscribe({
        next: (savedAddress) => {
          this.address = {}
          this.ngOnInit()
          this.resetForm()
          this.routeToPreviousUrl()
          this.translate.get('ADDRESS_ADDED', { city: savedAddress.city }).subscribe({
            next: (addressAdded) => {
              this.snackBarHelperService.open(addressAdded, 'confirmBar')
            },
            error: (translationId) => {
              this.snackBarHelperService.open(translationId, 'confirmBar')
            }
          })
        },
        error: (err) => {
          this.snackBarHelperService.open(err.error?.error, 'errorBar')
          this.address = {}
          this.resetForm()
        }
      })
>>>>>>> main
    }
  }

  initializeForm (address) {
<<<<<<< HEAD
    this.addressModel.set({
      country: address.country ?? '',
      fullName: address.fullName ?? '',
      mobileNum: address.mobileNum ?? null,
      zipCode: address.zipCode ?? '',
      streetAddress: address.streetAddress ?? '',
      city: address.city ?? '',
      state: address.state ?? ''
    })
=======
    this.countryControl.setValue(address.country)
    this.nameControl.setValue(address.fullName)
    this.numberControl.setValue(address.mobileNum)
    this.pinControl.setValue(address.zipCode)
    this.addressControl.setValue(address.streetAddress)
    this.cityControl.setValue(address.city)
    this.stateControl.setValue(address.state)
>>>>>>> main
  }

  routeToPreviousUrl () {
    this.location.back()
  }

  resetForm () {
<<<<<<< HEAD
    this.addressForm().reset({ ...this.initialModel })
  }

  private async confirmationMessage (key: string, city: string): Promise<string> {
    try {
      return await firstValueFrom(this.translate.get(key, { city }))
    } catch (translationId) {
      return translationId as string
    }
=======
    this.countryControl.markAsUntouched()
    this.countryControl.markAsPristine()
    this.countryControl.setValue('')
    this.nameControl.markAsUntouched()
    this.nameControl.markAsPristine()
    this.nameControl.setValue('')
    this.numberControl.markAsUntouched()
    this.numberControl.markAsPristine()
    this.numberControl.setValue('')
    this.pinControl.markAsUntouched()
    this.pinControl.markAsPristine()
    this.pinControl.setValue('')
    this.addressControl.markAsUntouched()
    this.addressControl.markAsPristine()
    this.addressControl.setValue('')
    this.cityControl.markAsUntouched()
    this.cityControl.markAsPristine()
    this.cityControl.setValue('')
    this.stateControl.markAsUntouched()
    this.stateControl.markAsPristine()
    this.stateControl.setValue('')
>>>>>>> main
  }
}
