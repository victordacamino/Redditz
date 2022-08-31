import {Query, Resolver} from "type-graphql";

@Resolver()
export class HelloResolver{
    @Query(() => String)
    hello(){
        return "where theres a will theres a way"
    }
}