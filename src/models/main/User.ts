import { TaskAnswer } from '../course/task_answer';
import { UserSetting } from './user_setting';
import { UserData } from './user_data';
import { EvaluationRequest } from '../diagnostic/evaluation-request';
import { Evaluation } from '../diagnostic/evaluation';

import AppService from '../../services/app.service';
import Role from './Role';

export default class User {
    id: string;
    username: string;
    code: string;

    email: string;
    telePhone: number;

    apikey: string;
    password: string;

    photoUrl: string;

    message: string;
    get avatar(): string {
        const prefix = this.photoUrl.split('ttps://').length > 1 ? '' : AppService.serverAddress
        return prefix + this.photoUrl
    }
    provider: string = 'LOCAL';
    roleId: string;
    role: Role = new Role();
    roles: Array<string> = [];

    evaluators: Array<Evaluation> = []
    evaluations: Array<Evaluation> = []
    evaluationRequestes: Array<EvaluationRequest> = []
    evaluationRequested: Array<EvaluationRequest> = []


    taskAnswers: Array<TaskAnswer> = [];
    datas: UserData = new UserData();
    settings: UserSetting = new UserSetting();

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;



    constructor() {
        this.datas = new UserData()
        this.settings = new UserSetting()
    }
    
    get ownRole() {

        return [{ name: this.roleId, icon: 'pe-7s-medal', color: 'bg-warning' },
        { name: this.roleId, icon: 'pe-7s-delete-user', color: 'bg-default' },][this.roleId == 'FREE' ? 0 : 1]
    }

}
