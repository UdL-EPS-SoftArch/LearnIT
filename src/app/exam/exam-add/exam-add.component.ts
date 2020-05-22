
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Sort} from '@lagoshny/ngx-hal-client';
import {NgForm} from '@angular/forms';

import {Exam} from '../exam';
import {ExamService} from '../exam.service';

import {Question} from '../../question/question';
import {QuestionService} from '../../question/question.service';

import { Student } from '../../student/student';
import { StudentService } from '../../student/student.service';

import { StudentExam } from '../../manytomany/students_exams';
import { StudentExamService } from '../../manytomany/students_exams.service';

import { ExamQuestion } from '../../manytomany/exams_questions';
import { ExamQuestionService } from '../../manytomany/exams_questions.service';



@Component({
  selector: 'app-exam-add',
  templateUrl: './exam-add.component.html'
})

export class NewExamComponent implements OnInit {

  public exam: Exam;

  public name: string = '';

  public number_of_questions = 0;
  public mark = 1;
  public pendent: boolean = true;

  public questions: Question[] = [];
  public question: Question;

  public questions_selected: string[] = [];
  public students_selected: string[] = [];

  public exam_question: ExamQuestion;
  public student_exam: StudentExam;

  public students: Student[] = [];
  public student: Student;

  //public totalRecipes = 0;
  private sorting: Sort[] = [{ path: 'statement', order: 'ASC' }];

  constructor(
    private router: Router,
    private examService: ExamService,
    private questionService: QuestionService,
    private studentService: StudentService,
    private studentExamService: StudentExamService,
    private examQuestionService: ExamQuestionService) {

      console.log("new exam constructor");
  }

  ngOnInit(): void {
    console.log("new exam init");

    this.exam = new Exam();

    this.questionService.getAll({sort: this.sorting}).subscribe(
      (questions: Question[]) => {
        console.log(questions);

        //this.totalRecipes = this.questionService.totalElement();

        this.questions = questions;
      });

    this.studentService.getAll({sort: this.sorting}).subscribe(
      (students: Student[]) => {
        console.log(students);

        this.students = students;
      });
  }


  onSubmit(form: NgForm): void {
    console.log("new exam submit");
    console.log(form);

    this.exam.nbOfQuestions = this.questions_selected.length;

    //console.log(this.exam);
    //console.log(this.questions_selected);
    //console.log(this.students_selected);

    this.examService.create(this.exam).subscribe(
      (exam: Exam) => {
        this.exam = exam;
        console.log(this.exam);
        console.log(this.exam._links.self.href);

        for (let q_selected of this.questions_selected) {

          let question_id = q_selected.split('/')[2];

          this.exam_question = new ExamQuestion();

          this.questionService.get(question_id).subscribe(
            (question: Question) => {
              console.log(question);
              console.log(question._links.self.href);

              this.exam_question.question = question;
              //this.exam_question.question = question._links.self.href;
              //this.exam_question.question_id = question_id;

              this.exam_question.exam = this.exam;
              //this.exam_question.exam = this.exam._links.self.href;
              //this.exam_question.exam_id = this.exam.id;
              console.log(this.exam_question);

              this.examQuestionService.create(this.exam_question).subscribe(
                (exam_question: ExamQuestion) => {
                  console.log(exam_question);
                });

            });
        }

        for (let s_selected of this.students_selected) {

          let student_id = s_selected.split('/')[2];

          this.student_exam = new StudentExam();

          this.studentService.get(student_id).subscribe(
            (student: Student) => {
              this.student_exam.exam = this.exam;
              this.student_exam.student = student;

              this.studentExamService.create(this.student_exam).subscribe(
                (student_exam: StudentExam) => {
                  console.log(student_exam);
                }
              );
            });
        }

      });


    //this.router.navigate(['exams'])
  }

}




//
