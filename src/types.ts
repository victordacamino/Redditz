import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";

export class MyContext{
    em: EntityManager<IDatabaseDriver<Connection>>
}