import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OfferingsListModel } from '../../models';
import { selectOfferingsForCourse } from '../../state';

@Component({
  selector: 'app-offering',
  templateUrl: './offering.component.html',
  styleUrls: ['./offering.component.css'],
})
export class OfferingComponent implements OnInit {
  data$!: Observable<OfferingsListModel>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.data$ = this.store.select(selectOfferingsForCourse);
  }
}
