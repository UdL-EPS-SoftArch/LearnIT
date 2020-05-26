
import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Observable} from 'rxjs';

import { StudentExam } from './students_exams';
import { Exam } from '../exam/exam';
import { Student } from '../student/student';

@Injectable()
export class StudentExamService extends RestService<StudentExam>{

  constructor(injector: Injector) {
    super(StudentExam, 'students_exams', injector);
  }

  public findByExam(exam: Exam): Observable<StudentExam[]> {
    const options: any = {
      params: [
        {
          key: 'exam',
          value: exam
        }
      ]
    };
    return this.search('findByExam', options);
  }

  public findByStudent(student: Student): Observable<StudentExam[]> {
    const options: any = {
      params: [
        {
          key: 'student',
          value: student
        }
      ]
    };
    return this.search('findByStudent', options);
  }

  public findByStudentAndExam(student: Student, exam: Exam): Observable<StudentExam[]> {
    const options: any = {
      params: [
        {
          key: 'student',
          value: student
        },
        {
          key: 'exam',
          value: exam
        }
      ]
    };
    return this.search('findByStudentAndExam', options);
  }
}
