import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { InputFile } from 'src/app/models/input-file.model';
import { CourseService } from 'src/app/services/course.service';
import * as moment from 'moment';
import { CreateAssignment } from 'src/app/models/form-models';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent {

  /**
   * The selected date from the calendar
   */
  selectedDate: string = null;

  /**
   * Simple form to create an assignment
   */
  assignmentForm: FormGroup;

  /**
   * min and max date for the calendar
   */
  minDateAssignment = moment(new Date()).format('YYYY-MM-DD');
  maxDateAssignment = moment(this.minDateAssignment).add(1, 'M').format('YYYY-MM-DD');

  /**
   * A model which is filled with data and put in the correct method
   * of the course service
   */
  model: CreateAssignment;

  /**
   * In the constructor there is the initialization of the model
   * and also of the form
   * @param courseService 
   * @param formBuilder 
   * @param dialogRef 
   */

  constructor(private courseService: CourseService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<CreateAssignmentComponent>) {
    this.model = {name: '', content: null, expiryDate: ''}
    this.assignmentForm = this.formBuilder.group({
      name: ['', [Validators.pattern('^[A-Za-z0-9 -]{2,32}$')]],
      content: [''],
      expiryDate: ['']
    });
  }

  /**
   * This method is used to submit a new assignment created by a teacher
   * It takes the name, the date and the content which can be a file pdf, jpg, ecc..
   * THen call the correct method of the course service and if the assignment
   * is created correctly, this dialog is closed
   */
  onSubmit() {
    if (this.assignmentForm.invalid) {
      return;
    }
    this.model.name = this.assignmentForm.get('name').value;
    const expiryDate = new Date(this.selectedDate);
    expiryDate.setDate(expiryDate.getDate() + 1);
    this.model.expiryDate = expiryDate.getTime().toString(10);
    const fileInput: InputFile = this.assignmentForm.get('content').value;
    this.model.content.files[0] = fileInput.files[0];

    this.courseService.createAssignment(this.model).pipe(first()).subscribe((assignment) => {
      if (assignment) {
        this.dialogRef.close(assignment);
      }
    });
  }

  /**
   * This method is used to set the date, taken from the calendar
   * @param selectedDate 
   */
  setSelectedDate(selectedDate: string) {
    this.selectedDate = selectedDate;
  }
}
