import AppService from '../app.service';
import IService from '../IService';
import {Goal} from '../../models/goal/goal';
import { StorageServices } from '../default/Storage.service';

export class GoalService extends AppService<Goal> implements IService<Goal> {

  public goal: Goal;
  constructor() {
    super('goals');
  }

  one(id: string) {
    return this.getOne(id)
  }

  all(f: any={}): Promise<Array<Goal>> {
    return this.getAll(f).then(g=>g.data)
  }

  update(o: any): Promise<Goal> {
    return this.updateOne(o);
  }

  create(o: any): Promise<Goal> {
    return this.createOne(o)
  }
}