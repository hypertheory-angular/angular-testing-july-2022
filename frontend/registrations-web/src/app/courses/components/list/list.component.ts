import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseListItemModel } from '../../models';
import { selectCourseList } from '../../state';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  courses$!: Observable<CourseListItemModel[]>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.courses$ = this.store.select(selectCourseList);
  }
}
