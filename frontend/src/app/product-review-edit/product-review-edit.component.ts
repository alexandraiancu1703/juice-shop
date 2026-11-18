/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

<<<<<<< HEAD
import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog'
import { form, FormField, submit } from '@angular/forms/signals'
import { firstValueFrom } from 'rxjs'
import { ProductReviewService } from '../Services/product-review.service'

import { type Review } from '../Models/review.model'
import { MAX_REVIEW_LENGTH, reviewFormSchema } from '../Models/review-form.schema'
=======
import { Component, type OnInit, inject, ChangeDetectionStrategy } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog'
import { UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProductReviewService } from '../Services/product-review.service'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowCircleLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { type Review } from '../Models/review.model'
>>>>>>> main
import { SnackBarHelperService } from '../Services/snack-bar-helper.service'
import { MatButtonModule } from '@angular/material/button'

import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule, MatLabel, MatHint, MatError } from '@angular/material/form-field'
import { TranslateModule } from '@ngx-translate/core'

import { MatIconModule } from '@angular/material/icon'

<<<<<<< HEAD
=======
library.add(faPaperPlane, faArrowCircleLeft)

>>>>>>> main
@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-product-review-edit',
  templateUrl: './product-review-edit.component.html',
  styleUrls: ['./product-review-edit.component.scss'],
<<<<<<< HEAD
  imports: [MatDialogContent, TranslateModule, MatFormFieldModule, MatLabel, MatInputModule, FormField, MatHint, MatError, MatDialogActions, MatButtonModule, MatDialogClose, MatIconModule]
})
export class ProductReviewEditComponent {
=======
  imports: [MatDialogContent, TranslateModule, MatFormFieldModule, MatLabel, MatInputModule, FormsModule, ReactiveFormsModule, MatHint, MatError, MatDialogActions, MatButtonModule, MatDialogClose, MatIconModule]
})
export class ProductReviewEditComponent implements OnInit {
>>>>>>> main
  data = inject<{
    reviewData: Review;
}>(MAT_DIALOG_DATA)
  private readonly productReviewService = inject(ProductReviewService)
  private readonly dialogRef = inject<MatDialogRef<ProductReviewEditComponent>>(MatDialogRef)
  private readonly snackBarHelperService = inject(SnackBarHelperService)

<<<<<<< HEAD
  private readonly initialModel = {
    message: this.data.reviewData.message
  }

  public readonly reviewModel = signal({ ...this.initialModel })

  public readonly maxReviewLength = MAX_REVIEW_LENGTH

  public readonly reviewForm = form(this.reviewModel, reviewFormSchema)

  editReview () {
    return submit(this.reviewForm, async () => {
      try {
        await firstValueFrom(this.productReviewService.patch({ id: this.data.reviewData._id, message: this.reviewModel().message }))
        this.dialogRef.close()
        this.snackBarHelperService.open('CONFIRM_CHANGES_SAVED')
      } catch (err: any) {
        console.log(err)
      }
    })
=======
  public editReviewControl: UntypedFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(160)])
  public error: string | null = null

  ngOnInit (): void {
    this.editReviewControl.setValue(this.data.reviewData.message)
  }

  editReview () {
    this.productReviewService.patch({ id: this.data.reviewData._id, message: this.editReviewControl.value }).subscribe({
      next: () => {
        this.dialogRef.close()
      },
      error: (err) => {
        console.log(err)
        this.error = err
      }
    })
    this.snackBarHelperService.open('CONFIRM_CHANGES_SAVED')
>>>>>>> main
  }
}
