
import AppService from '../app.service';
import IService from '../IService';
import User from '../../models/main/User';
import { StorageServices } from '../default/Storage.service';

export class UserService extends AppService<User> implements IService<User> {

  public user: User;

  constructor() {
    super('users');
  }

  async upgrade(u: User, to: string): Promise<User> {
    u.roleId = to;
    return await this.update(u)
  }

  async one(id: string): Promise<User> {
    return await this.getOne(id)
  }

  async all(f: any): Promise<Array<User>> {
    return await this.getAll(f)
  }

  async update(o: any): Promise<User> {
    return await this.updateOne(o);
  }

  async create(o: any): Promise<User> {
    return await this.createOne(o)
  }

  async delete(o: any): Promise<User> {
    return await this.deleteOne(o)
  }

}