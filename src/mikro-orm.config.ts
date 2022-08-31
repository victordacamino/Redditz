import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
    migrations: {
        glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
    },
    entities: [Post],
    dbName: 'redditz',
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'postgres',
    type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];

