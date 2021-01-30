import {Component, ViewChild, AfterViewInit, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';

import {Student} from '../../models/student.model';
import {MatTable, MatTableDataSource} from '@angular/material/table';

import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatInput} from '@angular/material/input';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { InputFile } from '../../models/input-file.model';


@Component({
  selector: 'app-teacher-students',
  templateUrl: './teacher-students.component.html',
  styleUrls: ['./teacher-students.component.css']
})

/**
 * This component represents the tab student view for the teacher
 */

export class TeacherStudentsComponent implements OnInit, AfterViewInit, OnDestroy {


  /**
  * Is used for the unsubscription when the component is destroyed
  */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * Mat sort used for the table of the students
   */
  @ViewChild(MatSort, {static: true}) sort: MatSort;



  @ViewChild('autoComplete') autoComplete: MatAutocomplete;

  // columnsToDisplay = ['select'].concat(Object.keys(DB_STUDENT[0]));

  /**
   * columns to use in table to display the students
   */
  columnsToDisplay: string[] = ['select', 'id', 'firstName', 'lastName', 'team']; //'teamId'

  /**
   * datasource for the students
   */
  dataSource: MatTableDataSource<Student>;

  /**
   * is used to take track of the selected row in the table
   */
  selection: SelectionModel<Student>;

  /**
   * this is the form control to input the student 
   * to be enrolled by the teacher
   */
  addStudentControl = new FormControl();

  /**
   * this is the form control to input the students 
   * to be enrolled by the teacher with csv
   */
  addStudentsCsvControl = new FormControl();

  /**
   * event emitter for the autocompletion of the students
   */
  @Output() searchingStudentsByNameEvent = new EventEmitter<string>();

  /**
   * List of students after for the search
   */
  @Input() searchedStudents: Observable<Student[]>;


  /**
   * this is used to set the enrolledStudents, taken from the container
   */
  @Input() set enrolledStudents(enrolledStudents: Student[]) {
    this.dataSource.data = enrolledStudents;
  }

  /**
   * event emitter used to enroll students to course
   */
  @Output() enrollStudentsToCourseEvent = new EventEmitter<Student[]>();

  /**
   * event emitter used to unenroll students from course
   */
  @Output() unenrollStudentsToCourseEvent = new EventEmitter<Student[]>();

  /**
   * Mat paginator for the table of the students
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * event emitter used to enroll students to course with csv
   */
  @Output() enrollStudentsToCourseWithCsv = new EventEmitter<FormData>();

  constructor() { }

  /**
   * unsubscribe
   */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  addStudentsWithCsv() {
    const formData = new FormData();
    const fileInput: InputFile = this.addStudentsCsvControl.value;
    formData.append('file', fileInput.files[0]);
    this.enrollStudentsToCourseWithCsv.emit(formData);
    this.addStudentsCsvControl.reset();
  }


  /**
   * valueChanges: A multicasting observable that emits an event every time the 
   * value of the control changes, in the UI or programmatically. It also emits 
   * an event each time you call enable() or disable() without passing along 
   * {emitEvent: false} as a function argument.
  */
    ngOnInit(): void {
      // ALE
         this.addStudentControl.valueChanges
         .pipe(
             takeUntil(this.destroy$), // Emits the values emitted by the source Observable until a notifier Observable emits a value.
                                       // Lets values pass until a second Observable, notifier, emits a value. Then, it completes.
             debounceTime(300), //  Emits a value from the source Observable only 
                               // after a particular time span has passed without another source emission.
             distinctUntilChanged()
         )
         .subscribe((name: string) => this.searchingStudentsByNameEvent.emit(name));
  }

  /**
   * manage the paginator and the sort for the table of the students
   */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log('On after view init, students component');
  }

  /** 
   * Selects all rows if they are not all selected; otherwise clear selection.
  */
  masterToggle() {
    this.isFirstPageSelected() ?
      this.selection.deselect(...this.dataSource._pageData(this.dataSource._orderData(this.dataSource.filteredData))) :
      this.selection.select(...this.dataSource._pageData(this.dataSource._orderData(this.dataSource.filteredData)))
  }

  // ALE
  /**
   * how to know if the first page is selected
   */
  isFirstPageSelected() {
    return this.dataSource._pageData(this.dataSource._orderData(this.dataSource.filteredData)).every((row) => this.selection.isSelected(row));
  }

  /**
   * select all rows (ALL)
   */
  selectAll() {
    this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /**
   * The label for the checkbox on the passed row
   * @param row 
   */
  checkboxLabel(row?: Student): string {
    if (!row) {
      return `${this.isFirstPageSelected() ? 'select' : 'deselect'} all`;
    }
    // is correct to put row.id or I need a row.position (not displayed)
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /**
   * add a student selected and emit the event
   */
  addStudent() {
    this.enrollStudentsToCourseEvent.emit([this.addStudentControl.value]);
    this.addStudentControl.setValue('');
    this.selection.clear();
  }

  /**
   * deselect the students selected by the teacher
   */
  deleteSelected() {
    if(this.selection.selected!==null) {
      this.unenrollStudentsToCourseEvent.emit(this.selection.selected);
      this.selection.clear();
    }
  }

  displayFn(s: Student): string {
    return s ? Student.toString(s) : '';
  }


}
