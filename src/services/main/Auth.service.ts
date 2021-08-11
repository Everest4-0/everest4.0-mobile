import { UserService } from './User.service';
import { StorageServices } from './../default/Storage.service';
import { catchError } from 'rxjs/operators';

import User from '../../models/main/User';

export class AuthService extends UserService {

    public user: User = new User();
    
    private store: StorageServices=new StorageServices()
    constructor() {
        super();
        const u = this.store.get<User>('userToken')
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
    authenticate(o: User, callback) {
        o.provider = 'LOCAL';
        const service = this.axios.post(this.url + '/authenticate', o);
        service.then((data) => {
            const u=data.data
            switch (parseInt(u.code)) {
                case 401:
                    u.message = 'Endereço de e-mail ou palavra-passe esta incorretas.'
                    break;
                case 404:
                    u.message = 'Infelizmente não reconhecemos esta conta.'
                    break;
                default:
                    u.message = undefined
                    break;
            }
            callback(u)
        }).catch(e => {
            e.message = 'INTERNAL SERVER ERROR'
            callback(e)
        })

        catchError(err => {
            let urr = err
        })
    }

    signOut(): void {
        localStorage.clear();
    }


}
