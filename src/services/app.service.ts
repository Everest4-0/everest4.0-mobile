
import { environment } from '../configs';
import Axios from 'axios'
import { StorageServices } from './default/Storage.service';
import User from '../models/main/User';

const serverAddress = environment.serverAddress;

export { serverAddress };
class AppService<T> {
  public static serverAddress = serverAddress;
  protected headers;
  protected url;
  protected axios = Axios;
  public serverAddress = serverAddress;
  constructor(private service: string) {
    this.url = `${this.serverAddress}/api/v1/${service.split('.').join('/')}`;

    try {
      //const data = JSON.parse(localStorage.getItem('userToken'));
      this.headers =
      {
        apikey: environment.appKey,
        authorization: '' //data.filter(o => o.key === 'current_user')[0].data.apikey
      }
    } catch (e) { }

  }
  static async me() {
    return await StorageServices.get<User>('userToken');
  }
  protected async getOne(s: string, a?: any): Promise<any> {
    const str = this.getQuery(a);
    this.headers.authorization=await AppService.me();
    return await Axios.get(this.url + '/' + s + '?' + str, { 'headers': this.headers })

  }

  protected async getAll(a: any): Promise<any> {
    const str = this.getQuery(a);
    const data=await AppService.me();
    this.headers.authorization=data.apikey
    return await Axios.get(this.url + '?' + str, { 'headers': this.headers })
  }

  protected async createOne(o: T): Promise<any> {
    this.headers.authorization=await AppService.me();
    return await Axios.post(this.url, o, { 'headers': this.headers })
  }

  protected async updateOne(o: any, q: any = {}): Promise<any> {
    const str = this.getQuery(q)
    this.headers.authorization=AppService.me();
    return await Axios.get(this.url + '?' + str, o, { 'headers': this.headers })
  }

  protected async deleteOne(id): Promise<any> {
    this.headers.authorization=AppService.me();
    return await Axios.delete(this.url + '/' + id, { 'headers': this.headers })
  }

  protected async deleteBy(o): Promise<any> {
    this.headers.authorization=AppService.me();
    return await Axios.post(this.url + '/delete/by', o, { 'headers': this.headers })
  }

  private getQuery(a: any) {
    let str = '';

    for (const key in a) {
      if (str !== '') {
        str += '&';
      }
      str += key + '=' + encodeURIComponent(a[key]);
    }

    return str;
  }
}

export default AppService;