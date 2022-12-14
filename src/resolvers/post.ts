import { RequiredEntityData } from "@mikro-orm/core";
import { Post } from "src/entities/Post";
import { MyContext } from "src/types";
import {Arg, Ctx, Int, Mutation, Query, Resolver} from "type-graphql";

@Resolver()
export class PostResolver{
    @Query(() => [Post])
    posts(@Ctx() {em}: MyContext): Promise<Post[]>{
        return em.find(Post, {});
    }
    
    @Query(() => Post, {nullable: true})
    post(
        @Arg("id", () => Int) id: number,
        @Ctx() {em}: MyContext
    ): Promise<Post | null>{
        return em.findOne(Post, { id });
    }

    @Mutation(() => Post, {nullable: true})
    async createPost(
        @Arg("title", () => String) title: string,
        @Ctx() {em}: MyContext
    ): Promise<Post | null>{
        const post = em.create(Post, {title} as RequiredEntityData<Post>);
        await em.persistAndFlush(post);
        return post;
    }

    @Mutation(() => Post, {nullable: true})
    async updatePost(
        @Arg("id", () => Int) id: number,
        @Arg("title", () => String, {nullable: true}) title: string,
        @Ctx() {em}: MyContext
    ): Promise<Post | null>{
        const post = await em.findOne(Post, { id });
        if (!post){
            return null;
        }
        if (typeof title !== "undefined"){
            post.title = title;
            await em.persistAndFlush(post);
        }
        return post;
    }

    @Mutation(() => Post, {nullable: true})
    async deletePost(
        @Arg("id", () => Int) id: number,
        @Ctx() {em}: MyContext
    ): Promise<boolean>{
        try{
            await em.nativeDelete(Post, {id});
        } catch {
            return false;
        }
        return true;
    }
}