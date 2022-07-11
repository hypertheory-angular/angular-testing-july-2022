import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseListItemModel } from '../../models';
import { selectCourseList, selectCoursesApiHasError } from '../../state';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  courses$!: Observable<CourseListItemModel[]>;
  hasError$!: Observable<boolean>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.courses$ = this.store.select(selectCourseList);
    this.hasError$ = this.store.select(selectCoursesApiHasError);
  }
}
