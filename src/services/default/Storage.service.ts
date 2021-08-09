import { Stored } from './../../models/stored';
import AsyncStorage from '@react-native-community/async-storage';

// key that is used to access the data in local storage
const STORAGE_KEY = 'local_everest_key';

export class StorageServices {
    private storage = AsyncStorage;

    constructor() { }
    public async save(key: string, o: any): Promise<boolean> {

        // get array of tasks from local storage
        const storage = await this.storage.getItem(STORAGE_KEY) || [];
        // push new task to array
        let data=JSON.parse(storage+'');
        data.push({
            key: key,
            data: o,
            isChecked: false
        });
        // insert updated array to local storage
        this.remove(key);
        this.storage.setItem(STORAGE_KEY, JSON.stringify(data));
        console.log(this.storage.getItem(STORAGE_KEY) || 'LocaL storage is empty');

        return true;
    }
    public async get<T>(key: string): Promise<Stored<T>> {
        // get array of tasks from local storage
        const storage = await this.storage.getItem(STORAGE_KEY) || [];
        // push new task to array
        let data=JSON.parse(storage+'');

        const final = data.filter(k => k.key == key)[0];

        return final || {};
    }




    get authorizationKey() {
        return ''//this.get<any>('current_user').data.apikey
    }


    public async remove(key: string): Promise<boolean> {

        // get array of tasks from local storage
        const storage = await this.storage.getItem(STORAGE_KEY) || [];
        // push new task to array
        let data=JSON.parse(storage+'');

        const index = data.indexOf(key, 0);
        data.forEach((s, i) => {
            if (s.key === key) {
                data.splice(i, 1);
                this.storage.setItem(STORAGE_KEY, JSON.stringify(data));
            }
        });

        return true;
    }
}