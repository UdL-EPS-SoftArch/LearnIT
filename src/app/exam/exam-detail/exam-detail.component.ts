
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Sort} from '@lagoshny/ngx-hal-client';

import { User} from '../../login-basic/user';

import { Exam } from '../exam';
import { ExamService } from '../exam.service';
import { Question } from '../../question/question';
import { QuestionService } from '../../question/question.service';

import { Student } from '../../student/student';
import { StudentExam } from '../../manytomany/students_exams';
import { StudentExamService } from '../../manytomany/students_exams.service';

import { ExamQuestionService } from '../../manytomany/exams_questions.service';

import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';


@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html'
})
export class ExamDetailComponent implements OnInit {

  public exam: Exam = new Exam();

  public questions: Question[] = [];
  public students: Student[] = [];

  private sorting: Sort[] = [{ path: 'statement', order: 'ASC' }];

  constructor(
    public route: ActivatedRoute,
    public examService: ExamService,
    private questionService: QuestionService,
    private examQuestionService: ExamQuestionService,
    private studentExamService: StudentExamService,
    public authenticationService: AuthenticationBasicService) {
      console.log('exam detail constructor');
  }

  ngOnInit() {
    console.log('exam detail init');

    const id = this.route.snapshot.paramMap.get('id');

    this.examService.get(id).subscribe(
      exam => {
        this.exam = exam;
        // console.log(this.exam);

        this.examQuestionService.findByExam(this.exam).subscribe(
          resultExamQuestions => {
            // console.log(resultExamQuestions);

            for (const resultExamQuestion of resultExamQuestions) {
              this.questions.push(resultExamQuestion._embedded.question);
            }
          });

        this.studentExamService.findByExam(this.exam).subscribe(
          resultStudentsExams => {
            // console.log(resultStudentsExams);

            for (const resultStudentsExam of resultStudentsExams) {
              this.students.push(resultStudentsExam._embedded.student);
            }
          });
      });
  }

  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }

}




//
