
import AppService from '../app.service';
import IService from '../IService';

export class NewsService extends AppService<any> implements IService<any> {

  public any;

  constructor() {
    super('news');
  }

  one(id: string) {
    return this.getOne(id)
  }

  all(f: any={}): Promise<Array<any>> {
    return this.getAll(f).then(g=>g.data)
  }

  update(o: any): Promise<any> {
    return this.updateOne(o);
  }

  create(o: any): Promise<any> {
    return this.createOne(o)
  }

}