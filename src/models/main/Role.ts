import User from "./User";



export default class Role {
    id: string;
    descriptions: string;

    users: Array<User> = []

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    /*constructor(description?: string) {
        this.description = description;
    }*/
}