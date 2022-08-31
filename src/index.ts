import { MikroORM, RequiredEntityData } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from 'express'

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();

    const app = express();

    const emFork = orm.em.fork();
    const post = emFork.create(Post, {
        title: "my first post",
    } as RequiredEntityData<Post>);
    await emFork.persistAndFlush(post);
    const posts = await orm.em.getContext().find(Post, {});
    console.log(posts);
};

main().catch((err) => {
    console.error(err);
});