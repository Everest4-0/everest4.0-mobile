import { UserService } from './User.service';
import { StorageServices } from './../default/Storage.service';

import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import User from '../../models/main/User';

export class AuthService extends UserService {

    public user: User = new User();
    private store: StorageServices
    constructor() {
        super();
        const u = this.store.get<User>('current_user')
        if (u === undefined) {
            this.user = undefined
        } else {
            this.user = Object.assign(new User(), u);
        }
    }

    authorizationKey = () => this.user.apikey;

    async signOn(o: User): Promise<any> {
        return await this.axios.post(this.url + '?key=' + o.apikey, o, { 'headers': this.headers })
    }
    authenticate(o: User, callback): Observable<any> {
        const service = this.axios.post(this.url + '/authenticate', o);
        service.then((u: User) => {

            switch (parseInt(u.code)) {
                case 401:
                    u.message = 'Endereço de e-mail ou palavra-passe esta incorretas.'
                    callback(u)
                    break;
                default:
                    if (u.apikey) {

                        u = Object.assign(new User(), u)
                        this.store.remove('current_user')
                        this.store.save('current_user', u)
                        callback(u)
                        window.open('./', '_self')

                    } else {
                        u.message = 'Infelizmente não reconhecemos esta conta.'
                        callback(u)
                    }

            }
        })
      //  return service;
    }

    signOut(): void {
        localStorage.clear();
    }


}
