import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {Level} from './level';
import {Observable} from 'rxjs';

@Injectable()
export class LevelService extends RestService<Level>{

  constructor(injector: Injector) {
    super(Level, 'levels', injector);
  }

  public findByNameContaining(text: string): Observable<Level[]> {
    const options: any = {params: [{key: 'text', value: text}]};
    return this.search('findByNameContaining', options);
  }
  
}
