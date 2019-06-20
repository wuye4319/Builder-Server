declare module 'mysql' {
  export interface basedb {
    insert(table: string, myobj: any): void
    find(table: string, where: object): Promise<any>
    update(table: string, data: any)
  }
}