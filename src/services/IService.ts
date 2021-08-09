export default interface IService<T> {

    one(id: string, query?: any): Promise<any>

    all(f: any): Promise<Array<any>>

    update(o: T, q?: any): Promise<any>

    create(o: T): Promise<any>
}
