import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Course } from 'src/app/models/course.model';
import { ProposalOfTeam } from 'src/app/models/proposal-of-team.model';
import { Proposal } from 'src/app/models/proposal.model';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-student-no-team',
  templateUrl: './student-no-team.component.html',
  styleUrls: ['./student-no-team.component.css']
})
/**
 * This class represents the tab TEAM if the student is NOT in a team for that course
 */
export class StudentNoTeamComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * these two variable are used in the calendar to set the range that a student has
   */
  minDateProposal = moment(new Date()).format('YYYY-MM-DD');
  maxDateProposal = moment(this.minDateProposal).add(1, 'M').format('YYYY-MM-DD');

  /**
   * course from student-team-container
   * It is used to display some informations like min and max size of a team and full name of the course
   */
  currentCourse: Course;

  /**
   * currentStudent is used in the student table so that 
   * if a student with the same last name (or seems like) is found, the current student is not displayed
   */
  currentStudent: Student;

  /**
   * This variable is the selected date from the calendar
   */
  selectedDate: string = null;

  /**
   * Columns used in the table of students
   */
  columnsToDisplayStudents = ['select', 'id', 'firstName', 'lastName'];

  /**
   * Table datasource for the students. It is dynamic
   */
  dataSourceStudents = new MatTableDataSource<Student>();

  /**
   * List of students selected
   */
  selectedStudents: Student[] = [];

  /**
   * Tracks the value and validation status of an individual form control.
   * In this case for the student
   */
  studentControl = new FormControl();

  /**
   * This variable is used for the unsubscription in OnDestroy method
   */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * take the course from the container and set it
   */
  @Input() set setCurrentCourse(currentCourse: Course) {
    console.log("ciao ", currentCourse.fullName);
    this.currentCourse = currentCourse;
  }

  /**
   * List of students after for the search
   */
  @Input() searchedStudents: Observable<Student[]>;

  /**
   * Event emitter for the autocompletion of the students
   */
  @Output() searchingStudentsByLastNameEvent = new EventEmitter<string>(); 

  /**
   * take the list of students that are enrolled and available and set it
   * Then set also the currentStudent and the data source for the student table
   */
  @Input() set setEnrolledAvailableStudents(students: Student[]) {
    const studentInfo = JSON.parse(localStorage.getItem('currentUser'));
    console.log('setEnrolledAvailableStudents, ', JSON.parse(localStorage.getItem('currentUser')))
    this.currentStudent = students.find((student) => student.id === studentInfo.username);
    this.dataSourceStudents.data = students.filter((student) => student.id !== studentInfo.id);
  }

  /**
   * Tracks the value and validation status of an individual form control.
   * In this case for the teamName
   */
  teamNameControl = new FormControl();

  /**
   * Table datasource for proposals. It is dynamic
   */
  dataSourceProposals = new MatTableDataSource<Proposal>();

  /**
   * Columns used in the proposals table
   */

  columnsToDisplayProposals = ['teamName', 'creator','membersWithState', 'deadline', 'accept', 'delete' ];

  /**
   * Take the list of proposals
   */
  @Input() set setProposals(proposals: Proposal[]) {
    this.dataSourceProposals.data = proposals;
  }

  /**
   * Event emitter for the proposal of a team after the createTeam is clicked
   */
  @Output() createTeamEvent = new EventEmitter<ProposalOfTeam>();

  /**
   * Event emitter for acceptes, rejected and deletedTeam
   */
  @Output() acceptedTeamProposalEvent = new EventEmitter<string>();
  @Output() rejectedTeamProposalEvent = new EventEmitter<string>();
  @Output() deletedTeamProposalEvent = new EventEmitter<string>();




  constructor() { }

  ngOnInit(): void {
      //jasonWatMore
        this.studentControl.valueChanges
        .pipe(
            takeUntil(this.destroy$), // Emits the values emitted by the source Observable until a notifier Observable emits a value.
                                      // Lets values pass until a second Observable, notifier, emits a value. Then, it completes.
            debounceTime(300), //  Emits a value from the source Observable only 
                              // after a particular time span has passed without another source emission.
            distinctUntilChanged()
        )
        .subscribe((lastName: string) => this.searchingStudentsByLastNameEvent.emit(lastName));
  }


  /**
   * This method is used to set the date, taken from the calendar
   * @param selectedDate 
   */
  setSelectedDate(selectedDate: string) {
    this.selectedDate = selectedDate;
  }

  ngAfterViewInit() {
    this.dataSourceStudents.paginator = this.paginator;
    this.dataSourceStudents.sort = this.sort;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * This method is used to display the student
   * @param student 
   */
  displayFn(student: Student): string {
    console.log('displayFn student.id', student ? Student.toString(student) : '');
    return student ? Student.toString(student) : '';
  }

  /**
   * Control if the student is selectable finding the studentId in the 
   * list of selected students
   * @param studentId 
   */
  isSelectable(studentId: string): boolean {
    return !this.selectedStudents.find(s => s.id === studentId);
  }

  /**
   * 
   * @param selectedStudent the student is added to the proposal of the team
   * before it is added there is a control on the studentId and also on the size of the current 
   * proposal team (selectedStudents.length)
   */
  addStudentToTeam(selectedStudent: Student) {
    if (!this.selectedStudents.find((s) => s.id === selectedStudent.id)) {
      if (this.selectedStudents.length + 2 > this.currentCourse.maxStudentsForTeam) {
        return;
      }
      this.selectedStudents.push(selectedStudent);
      this.studentControl.setValue('');
    }
  }
  /**
   * 
   * @param selectedStudent this student is removed from the proposal of a team
   * so it is again available in the table of students
   */
  removeStudentFromteam(selectedStudent: Student) {
    this.selectedStudents = this.selectedStudents.filter((s) => s.id !== selectedStudent.id);
  }

  /**
   * 
   */
  createTeam() {
    console.log('createTeam')
    if (this.selectedStudents.length + 1 < this.currentCourse.minStudentsForTeam) {
      console.log('error number of student for the team is low')
      return;
    }
    this.selectedStudents.push(this.currentStudent);
    let deadline: Date;
    //if there is no selectedDate create new one
    if (!this.selectedDate) {
      deadline = new Date();
    } else {
      deadline = new Date(this.selectedDate);
    }
    deadline.setDate(deadline.getDate() + 1); //+1 for this date
    if ( this.selectedStudents.length && this.teamNameControl.valid && deadline >= new Date()) {
      //emit the proposal of team to the container so it can use the createTeam of the service
      this.createTeamEvent.emit(
          new ProposalOfTeam(
              this.teamNameControl.value,
              deadline.getTime().toString(10),
              this.selectedStudents.map(x => x.id)
          )
      );
      this.teamNameControl.setValue('');
      this.selectedStudents = [];
    }
  }

  /**
   * @param deadline return the deadline in British English mode that
   * uses day-month-year order.
   * With the options: show only hours and minutes use options with the default locale
   */
  dateToString(deadline: string): string {
    const options = { hour: '2-digit', minute: '2-digit' }
    const date = new Date(deadline);
    return (date.toLocaleDateString('en-GB') + ' at ' + date.toLocaleTimeString('en-GB',options )
    );
  }

  /**
   * This method is used to call the acceptedTeamProposalEvent
   * @param teamToken 
   */
  acceptTeamProposal(teamToken: string) {
    this.acceptedTeamProposalEvent.emit(teamToken);
  }
  /**
   * This method is used to call the rejectedTeamProposalEvent
   * @param teamToken 
   */
  rejectTeamProposal(teamToken: string) {
    this.rejectedTeamProposalEvent.emit(teamToken);
  }
  /**
   * This method is used to call the deletedTeamProposalEvent
   * @param teamToken 
   */
  deleteTeamProposal(teamToken: string) {
    this.deletedTeamProposalEvent.emit(teamToken);
  }


  isAccepted(teamMembers: string[]): boolean {
    console.log("CIAO ", this.currentStudent.firstName, " ", this.currentStudent.lastName)
    if ( teamMembers.includes(
       `${this.currentStudent.firstName} 
       ${this.currentStudent.lastName} 
       (${this.currentStudent.id}) : ACCEPTED`)
    ) {
      return true;
    }
  }

  displayFnDelectedStudents(selectedStudents: string[]): string {
    let temp = '';
    selectedStudents.forEach((student) => (temp += ' ' + student + '\n'));
    return temp;
  }

}
