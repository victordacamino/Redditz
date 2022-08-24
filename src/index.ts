import { MikroORM } from "@mikro-orm/core";

const main = async () => {
    const orm = await MikroORM.init({
        dbName: 'redditz',
        type: 'postgresql', 
        debug: true
    })
}

console.log("Hello Wsadsaorld")