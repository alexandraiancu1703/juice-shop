/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { ProductReviewEditComponent } from './product-review-edit.component'
<<<<<<< HEAD
=======
import { ReactiveFormsModule } from '@angular/forms'
>>>>>>> main
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { of, throwError } from 'rxjs'
import { ProductReviewService } from '../../app/Services/product-review.service'
import { MatInputModule } from '@angular/material/input'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('ProductReviewEditComponent', () => {
    let component: ProductReviewEditComponent
    let fixture: ComponentFixture<ProductReviewEditComponent>
    let productReviewService: any
    let dialogRef: any

<<<<<<< HEAD
    const reviewData = { _id: '42', message: 'Review', author: 'Horst' }

=======
>>>>>>> main
    beforeEach(async () => {
        productReviewService = {
            patch: vi.fn().mockName("ProductReviewService.patch")
        }
        productReviewService.patch.mockReturnValue(of({}))
        dialogRef = {
            close: vi.fn().mockName("MatDialogRef.close")
        }
        dialogRef.close.mockReturnValue({})

        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
<<<<<<< HEAD
=======
                ReactiveFormsModule,
>>>>>>> main
                MatDialogModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonModule,
                MatSnackBarModule,
                ProductReviewEditComponent
            ],
            providers: [
                { provide: ProductReviewService, useValue: productReviewService },
<<<<<<< HEAD
                { provide: MAT_DIALOG_DATA, useValue: { reviewData } },
=======
                { provide: MAT_DIALOG_DATA, useValue: { productData: {} } },
>>>>>>> main
                { provide: MatDialogRef, useValue: dialogRef }
            ]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductReviewEditComponent)
        component = fixture.componentInstance
<<<<<<< HEAD
=======
        component.data = { reviewData: { _id: '42', message: 'Review', author: 'Horst' } }
>>>>>>> main
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should be initialized with data from the passed review', () => {
<<<<<<< HEAD
        expect(component.reviewModel().message).toBe('Review')
    })

    it('should require a review message', () => {
        component.reviewModel.update((model) => ({ ...model, message: '' }))
        expect(component.reviewForm.message().valid()).toBe(false)
        component.reviewModel.update((model) => ({ ...model, message: '   ' }))
        expect(component.reviewForm.message().valid()).toBe(false)
        component.reviewModel.update((model) => ({ ...model, message: 'Another Review' }))
        expect(component.reviewForm.message().valid()).toBe(true)
    })

    it('should update review through backend API', async () => {
        component.reviewModel.update((model) => ({ ...model, message: 'Another Review' }))
        await component.editReview()
=======
        component.data = { reviewData: { _id: '42', message: 'Review', author: 'Horst' } }
        component.ngOnInit()
        expect(component.editReviewControl.value).toBe('Review')
    })

    it('should update review through backend API', () => {
        component.data = { reviewData: { _id: '42', message: 'Review', author: 'Horst' } }
        component.ngOnInit()
        component.editReviewControl.setValue('Another Review')
        component.editReview()
>>>>>>> main
        expect(vi.mocked(productReviewService.patch).mock.calls.length).toBe(1)
        expect(vi.mocked(productReviewService.patch).mock.calls[0][0]).toEqual({ id: '42', message: 'Another Review' })
    })

<<<<<<< HEAD
    it('should close the dialog on submitting the edited review', async () => {
        productReviewService.patch.mockReturnValue(of({}))
        await component.editReview()
        expect(dialogRef.close).toHaveBeenCalled()
    })

    it('should log errors directly to browser console', async () => {
        const log = vi.spyOn(console, 'log').mockImplementation(() => {})
        productReviewService.patch.mockReturnValue(throwError(() => 'Error'))
        await component.editReview()
        expect(log).toHaveBeenCalledWith('Error')
        log.mockRestore()
=======
    it('should close the dialog on submitting the edited review', () => {
        productReviewService.patch.mockReturnValue(of({}))
        component.data = { reviewData: { _id: '42', message: 'Review', author: 'Horst' } }
        component.ngOnInit()
        component.editReview()
        expect(dialogRef.close).toHaveBeenCalled()
    })

    it('should log errors directly to browser console', () => {
        component.data = { reviewData: { _id: '42', message: 'Review', author: 'Horst' } }
        console.log = vi.fn()
        productReviewService.patch.mockReturnValue(throwError('Error'))
        component.ngOnInit()
        component.editReview()
        expect(console.log).toHaveBeenCalledWith('Error')
>>>>>>> main
        fixture.destroy()
    })
})
