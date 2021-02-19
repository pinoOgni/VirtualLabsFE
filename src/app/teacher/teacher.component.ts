import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
/**
 * This component is responsible for the teacher view. It comprends 3 tabs (students, vms and assignments)
 */
export class TeacherComponent implements OnInit, OnDestroy {

  /**
  * A Subject is like an Observable, but can multicast to many Observers. 
  * Subjects are like EventEmitters: they maintain a registry of many listeners.
  * Is used for the unsubscription when the component is destroyed
  */
  private destroy$: Subject<boolean> = new Subject<boolean>();


  /**
   * links used in teacher-component.html in ngFor to go to the correct tab
   */
  teacherLinks = [
    { label: 'Students', path: 'students' },
    { label: 'Vms', path: 'vms' },
    { label: 'Assignments', path: 'assignments' },
  ];

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      console.log('constructor teacher component courseId ', params.courseId)
      this.courseService.setNextCourse(params.courseId);
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.courseService.setNextCourse(null);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
