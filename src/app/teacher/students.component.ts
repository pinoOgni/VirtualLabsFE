import {Component, ViewChild, AfterViewInit, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {StudentModel} from '../student.model';
import {MatTable, MatTableDataSource} from '@angular/material/table';

import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatInput} from '@angular/material/input';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') input: MatInput;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('autoComplete') autoComplete: MatAutocomplete;

  private _enrolledStudents: StudentModel[];
  private _students: StudentModel[];

  // columnsToDisplay = ['select'].concat(Object.keys(DB_STUDENT[0]));
  columnsToDisplay: string[] = ['select', 'serial', 'name', 'firstName', 'groupName'];

  dataSource: MatTableDataSource<StudentModel>;
  selection: SelectionModel<StudentModel>;
  options: StudentModel[];
  addStudentSelection = null;

  @Input() set students(students: StudentModel[]) {
    this._students = students.map( (element) => new StudentModel(element) );
    this.options = this._students;
  }

  @Input() set enrolledStudents(enrolledStudents: StudentModel[]) {
    this._enrolledStudents = enrolledStudents.map( (element) => new StudentModel(element) );
    this.dataSource = new MatTableDataSource<StudentModel>(this._enrolledStudents);
    this.dataSource.sort = this.sort;
    this.selection = new SelectionModel<StudentModel>(true, []);
    this.dataSource.paginator = this.paginator;
    this.addStudentSelection = null;
  }

  @Output() addEmitter = new EventEmitter<StudentModel>();
  @Output() removeEmitter = new EventEmitter<StudentModel[]>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() {
    this.options = [];
  }

  ngOnInit(): void {
    //TODO remove?
    this.dataSource = new MatTableDataSource<StudentModel>(this._enrolledStudents);
    this.dataSource.sort = this.sort;
    this.options = this._students;

    this.dataSource.paginator = this.paginator;
    console.log('On init, students component');
    this.dataSource.data = [... this._enrolledStudents ];
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log('On after view init, students component');
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // The label for the checkbox on the passed row
  checkboxLabel(row?: StudentModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    // is correct to put row.id or I need a row.position (not displayed)
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.serial + 1}`;
  }

  addStudent() {
   if(this.addStudentSelection!==null) {
     this.addEmitter.emit(this.addStudentSelection);
     this.dataSource.data = [... this._enrolledStudents ];
     this.addStudentSelection = null;
     this.input.value = '';
   }
  }

  updateAddSelection(event: MatAutocompleteSelectedEvent) {
    this.addStudentSelection = (event && event.option) ? event.option.value : null;
  }

  deleteSelected() {
    if(this.selection.selected!==null) {
      this.removeEmitter.emit(this.selection.selected);

      // forse c'è un altro modo. Per ora sposto la delete al container e qui aggiorno il data source
      this.dataSource.data = [...this._enrolledStudents];
      this.selection = new SelectionModel<StudentModel>(true, []);
    }
  }

  displayFn(st: StudentModel): string {
    return st.toString();
  }

  queryFilter(filterValue: string = ' ') {
    filterValue = filterValue.toLocaleLowerCase();
    filterValue = filterValue.trim();
    this.options = this._students.filter(student => filterValue === '' ? true : student.toString().toLocaleLowerCase().includes(filterValue));
  }

}
