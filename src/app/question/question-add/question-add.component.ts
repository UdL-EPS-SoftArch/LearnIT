import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../login-basic/user';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {QuestionService} from '../question.service';
import {Question} from '../question';
import { ToastrService } from 'ngx-toastr';
import { DynamicGrid } from './grid.model';


@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html'
})

export class NewQuestionComponent implements OnInit {

  public question: Question;
  public ingredientNb = 1;

  constructor(private router: Router,
              private NewQuestionService: QuestionService,
              private toastr: ToastrService) {
  }


  dynamicArray: Array<DynamicGrid> = [];
  newDynamic: any = {};
  ngOnInit(): void {
    this.question = new Question();
    this.newDynamic = {ingredient: '', quantite: '',unite:''};
    this.dynamicArray.push(this.newDynamic);
    this.ingredientNb++;
  }

  onSubmit(): void {
    this.NewQuestionService.create(this.question).subscribe(
      (question: Question) => this.router.navigate(['questions']));
  }
  addRow() {
    this.newDynamic = {ingredient: '', quantite: '',unite:''};
    this.dynamicArray.push(this.newDynamic);
    this.toastr.success('New row added successfully', 'New Row');
    return true;
  }
  deleteRow(index) {
    if(this.dynamicArray.length === 1) {
      this.toastr.error('Can"t delete the row when there is only one row', 'Warning');
      return false;
    } else {
      this.dynamicArray.splice(index, 1);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }
}
