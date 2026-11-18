/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { ProductReviewEditComponent } from '../product-review-edit/product-review-edit.component'
import { UserService } from '../Services/user.service'
import { ProductReviewService } from '../Services/product-review.service'
<<<<<<< HEAD
import { Component, DestroyRef, type OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { form, FormField, submit } from '@angular/forms/signals'
import { catchError, EMPTY, finalize, firstValueFrom, Subject, switchMap } from 'rxjs'
import { MAX_REVIEW_LENGTH, reviewFormSchema } from '../Models/review-form.schema'
=======
import { Component, type OnDestroy, type OnInit, inject, ChangeDetectionStrategy } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowCircleLeft, faCrown, faPaperPlane, faThumbsUp, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
>>>>>>> main
import { SnackBarHelperService } from '../Services/snack-bar-helper.service'
import { type Review } from '../Models/review.model'
import { type Product } from '../Models/product.model'
import { ProductImageComponent } from '../product-image/product-image.component'
import { MatInputModule } from '@angular/material/input'
<<<<<<< HEAD
import { MatFormFieldModule, MatLabel, MatHint, MatError } from '@angular/material/form-field'
=======
import { MatFormFieldModule, MatLabel, MatHint } from '@angular/material/form-field'
>>>>>>> main
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion'
import { MatButtonModule, MatIconButton } from '@angular/material/button'
import { MatDivider } from '@angular/material/divider'
import { MatTooltip } from '@angular/material/tooltip'
<<<<<<< HEAD

library.add(faCrown)
=======
import { AsyncPipe } from '@angular/common'

library.add(faPaperPlane, faArrowCircleLeft, faUserEdit, faThumbsUp, faCrown)
>>>>>>> main

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
<<<<<<< HEAD
  imports: [MatDialogContent, MatTooltip, MatDivider, MatButtonModule, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, TranslateModule, MatIconButton, MatIconModule, MatFormFieldModule, MatLabel, MatHint, MatError, MatInputModule, FormField, MatDialogActions, MatDialogClose, ProductImageComponent]
})
export class ProductDetailsComponent implements OnInit {
=======
  imports: [MatDialogContent, MatTooltip, MatDivider, MatButtonModule, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, TranslateModule, MatIconButton, MatIconModule, MatFormFieldModule, MatLabel, MatHint, MatInputModule, FormsModule, ReactiveFormsModule, MatDialogActions, MatDialogClose, AsyncPipe, ProductImageComponent]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
>>>>>>> main
  private readonly dialog = inject(MatDialog)
  data = inject<{
    productData: Product;
}>(MAT_DIALOG_DATA)
  private readonly productReviewService = inject(ProductReviewService)
  private readonly userService = inject(UserService)
<<<<<<< HEAD
  private readonly snackBarHelperService = inject(SnackBarHelperService)
  private readonly destroyRef = inject(DestroyRef)

  public readonly maxReviewLength = MAX_REVIEW_LENGTH
  public readonly author = signal('Anonymous')
  public readonly reviews = signal<Review[]>([])
  public readonly likedReviewId = signal<string | null>(null)
  public readonly pendingLikeIds = signal<string[]>([])

  private readonly reloadReviews$ = new Subject<void>()

  private readonly initialModel = { message: '' }

  public readonly reviewModel = signal({ ...this.initialModel })

  public readonly reviewForm = form(this.reviewModel, reviewFormSchema)

  ngOnInit (): void {
    this.data.productData.points = Math.round(this.data.productData.price / 10)
    this.reloadReviews$
      .pipe(
        switchMap(() => this.productReviewService.get(this.data.productData.id).pipe(
          catchError((err) => {
            console.log(err)
            return EMPTY
          })
        )),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((reviews: Review[]) => this.reviews.set(reviews))
    this.loadReviews()
    this.userService.whoAmI(['email'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user: any) => this.author.set(user?.email || 'Anonymous'),
        error: (err) => console.log(err)
      })
  }

  private loadReviews (): void {
    this.reloadReviews$.next()
  }

  addReview () {
    return submit(this.reviewForm, async () => {
      const review = { message: this.reviewModel().message, author: this.author() }
      try {
        await firstValueFrom(this.productReviewService.create(this.data.productData.id, review))
        this.reviewForm().reset({ ...this.initialModel })
        this.loadReviews()
        this.snackBarHelperService.open('CONFIRM_REVIEW_SAVED')
      } catch (err: any) {
        console.log(err)
      }
    })
  }

=======
  private readonly snackBar = inject(MatSnackBar)
  private readonly snackBarHelperService = inject(SnackBarHelperService)

  public author = 'Anonymous'
  public reviews$: any
  public userSubscription: any
  public reviewControl: UntypedFormControl = new UntypedFormControl('', [Validators.maxLength(160)])

  ngOnInit (): void {
    this.data.productData.points = Math.round(this.data.productData.price / 10)
    this.reviews$ = this.productReviewService.get(this.data.productData.id)
    this.userSubscription = this.userService.whoAmI(['email']).subscribe({
      next: (user: any) => {
        if (user?.email) {
          this.author = user.email
        } else {
          this.author = 'Anonymous'
        }
      },
      error: (err) => { console.log(err) }
    })
  }

  ngOnDestroy () {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }
  }

  addReview (textPut: HTMLTextAreaElement) {
    const review = { message: textPut.value, author: this.author }

    textPut.value = ''
    this.productReviewService.create(this.data.productData.id, review).subscribe({
      next: () => {
        this.reviews$ = this.productReviewService.get(this.data.productData.id)
      },
      error: (err) => { console.log(err) }
    })
    this.snackBarHelperService.open('CONFIRM_REVIEW_SAVED')
  }

>>>>>>> main
  editReview (review: Review) {
    this.dialog.open(ProductReviewEditComponent, {
      width: '500px',
      height: 'max-content',
      data: {
        reviewData: review
      }
<<<<<<< HEAD
    }).afterClosed().subscribe(() => this.loadReviews())
  }

  likeReview (review: Review) {
    if (this.isLikePending(review._id)) {
      return
    }

    this.setLikePending(review._id, true)
    this.productReviewService.like(review._id)
      .pipe(finalize(() => {
        this.setLikePending(review._id, false)
        this.loadReviews()
      }))
      .subscribe({
        next: () => this.markReviewAsLiked(review._id),
        error: (err) => console.log(err)
      })
  }

  isOwnReview (review: Review): boolean {
    return !!this.isLoggedIn() && this.author() !== 'Anonymous' && review.author === this.author()
  }

  isLikePending (reviewId: string): boolean {
    return this.pendingLikeIds().includes(reviewId)
  }

  private setLikePending (reviewId: string, pending: boolean): void {
    this.pendingLikeIds.update((ids) =>
      pending
        ? [...ids, reviewId]
        : ids.filter((id) => id !== reviewId)
    )
  }

  private markReviewAsLiked (reviewId: string): void {
    this.reviews.update((reviews) =>
      reviews.map((review) =>
        review._id === reviewId
          ? { ...review, liked: true }
          : review
      )
    )
    this.likedReviewId.set(reviewId)
=======
    }).afterClosed().subscribe(() => (this.reviews$ = this.productReviewService.get(this.data.productData.id)))
  }

  likeReview (review: Review) {
    this.productReviewService.like(review._id).subscribe(() => {
      console.log('Liked ' + review._id)
    })
    setTimeout(() => (this.reviews$ = this.productReviewService.get(this.data.productData.id)), 200)
>>>>>>> main
  }

  isLoggedIn () {
    return localStorage.getItem('token')
  }
}
