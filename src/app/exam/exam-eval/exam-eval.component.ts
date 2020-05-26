
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Sort} from '@lagoshny/ngx-hal-client';
import { NgForm } from '@angular/forms';

import {User} from '../../login-basic/user';
import {Exam} from '../exam';
import {ExamService} from '../exam.service';
import {Question} from '../../question/question';
import {QuestionService} from '../../question/question.service';

import { ExamQuestionService } from '../../manytomany/exams_questions.service';

import { Student } from '../../student/student';
import { StudentExam } from '../../manytomany/students_exams';
import { StudentExamService } from '../../manytomany/students_exams.service';

import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';


@Component({
  selector: 'app-exam-eval',
  templateUrl: './exam-eval.component.html'
})

export class EvalExamComponent implements OnInit {

  public exam: Exam = new Exam();
  public questions: Question[] = [];

  public student: Student;
  public studentExam: StudentExam = new StudentExam();

  public numberOfQuestions = 1;
  public done = false;

   // public totalRecipes = 0;
   // private sorting: Sort[] = [{ path: 'statement', order: 'ASC' }];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private examService: ExamService,
    private examQuestionService: ExamQuestionService,
    private studentExamService: StudentExamService,
    public authenticationService: AuthenticationBasicService) {

      console.log('new eval exam constructor');
  }

  ngOnInit(): void {
    console.log('new eval exam init');

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.student = this.authenticationService.getCurrentUser();

    this.examService.get(id).subscribe(
      exam => {
        this.exam = exam;
        // console.log(this.exam);

        this.examQuestionService.findByExam(this.exam).subscribe(
          examsQuestions => {

            for (const examsQuestion of examsQuestions) {
               // console.log(examsQuestion);

              examsQuestion._embedded.question.tmp = '';
              this.questions.push(examsQuestion._embedded.question);
            }
          });

        this.studentExamService.findByStudentAndExam(this.student, this.exam).subscribe(
          (studentsExams: StudentExam[]) => {
             // console.log(studentsExams);

            this.studentExam = studentsExams[0];
            console.log(this.studentExam);
          });
      });
  }

  onSubmit(data: NgForm): void {
    console.log('eval exam evaluate');

    const correct = 10 / Number(this.questions.length);
    let mark = 0.00;

    for (const q of this.questions) {
      if (q.tmp === q.answer) {
        mark += correct;
      }
    }
    console.log(mark);

    this.studentExam.pendent = false;
    this.studentExam.mark = mark;
    console.log(this.studentExam);

    // save

    this.studentExamService.patch(this.studentExam).subscribe(
      (resultStudentExam: StudentExam) => this.router.navigate(['exams']));

  }
}




//
