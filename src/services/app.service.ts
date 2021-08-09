import { environment } from '../configs';
import Axios from 'axios'

const serverAddress = environment.serverAddress;

class AppService<T> {
  static serverAddress = serverAddress;
  protected headers;
  protected url;
  protected axios = Axios;
  public serverAddress = serverAddress;
  constructor(private service: string) {
    this.url = `${this.serverAddress}/api/v1/${service.split('.').join('/')}`;

    try {
      const data = JSON.parse(localStorage.getItem('local_everest_key'));
      this.headers =
      {
        apikey: environment.appKey,
        authorization: data.filter(o => o.key === 'current_user')[0].data.apikey
      }
    } catch (e) { }

  }
  get apikey() {
    return null;// this.http.get('./angular.json', { headers });
  }
  protected async getOne(s: string, a?: any): Promise<any> {
    const str = this.getQuery(a);
    return await Axios.get(this.url + '/' + s + '?' + str, { 'headers': this.headers })

  }

  protected async getAll(a: any): Promise<any> {
    const str = this.getQuery(a);
    return await Axios.get(this.url + '?' + str, { 'headers': this.headers })
  }

  protected async createOne(o: T): Promise<any> {
    return await Axios.post(this.url, o, { 'headers': this.headers })
  }

  protected async updateOne(o: any, q: any = {}): Promise<any> {
    const str = this.getQuery(q)
    return await Axios.get(this.url + '?' + str, o, { 'headers': this.headers })
  }

  protected async deleteOne(id): Promise<any> {
    return await Axios.delete(this.url + '/' + id, { 'headers': this.headers })
  }

  protected async deleteBy(o): Promise<any> {
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