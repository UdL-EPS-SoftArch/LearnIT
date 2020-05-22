
import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Observable} from 'rxjs';

import {Theory} from './theory';
import { Topic } from '../topic/topic';
import { Level } from '../level/level';


@Injectable()
export class TheoryService extends RestService<Theory>{

  constructor(injector: Injector) {
    super(Theory, 'theories', injector);
  }

  public findByStatementContaining(text: string): Observable<Theory[]> {
    const options: any = {params: [{key: 'text', value: text}]};
    return this.search('findByStatementContaining', options);
  }

  public findByLevel(level: Level): Observable<Theory[]> {
    const options: any = {
      params: [
        {
          key: 'level',
          value: level
        }
      ]};

    return this.search('findByLevel', options);
  }

  public findByTopic(topic: Topic): Observable<Theory[]> {
    const options: any = {
      params: [
        {
          key: 'topic',
          value: topic
        }
      ]};

    return this.search('findByTopic', options);
  }

  public findByLevelAndTopic(level: Level, topic: Topic): Observable<Theory[]> {
    const options: any = {
      params: [
        {
          key: 'level',
          value: level
        },
        {
          key: 'topic',
          value: topic
        }
      ]};

    return this.search('findByLevelAndTopic', options);
  }
}
