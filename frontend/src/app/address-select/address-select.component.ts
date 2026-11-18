/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

<<<<<<< HEAD
import { Component, ChangeDetectionStrategy } from '@angular/core'
=======
import { Component, NgZone, inject, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
>>>>>>> main
import { AddressComponent } from '../address/address.component'

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-address-select',
  templateUrl: './address-select.component.html',
  styleUrls: ['./address-select.component.scss'],
  imports: [AddressComponent]
})
export class AddressSelectComponent {
<<<<<<< HEAD
  public readonly showNextButton = true
=======
  private readonly router = inject(Router)
  private readonly ngZone = inject(NgZone)

  public addressId: any = undefined
  public showNextButton = true

  getMessage (id) {
    this.addressId = id
  }
>>>>>>> main
}
