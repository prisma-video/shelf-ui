// import gql from 'sudograph';
// import sudograph from 'sudograph';
import gql from '/Users/vincentlopez/projects/theshelf/shelf_ui/script/node_modules/sudograph/build/sudograph.js';
import sudograph from '/Users/vincentlopez/projects/theshelf/shelf_ui/script/node_modules/sudograph/build/sudograph.js';
// const  gql = require( './node_modules/sudograph')
// const  sudograph = require( './node_modules/sudograph')

const {
    // query,
    mutation
} = sudograph({
    canisterId: 'ryjl3-tyaaa-aaaaa-aaaba-cai'
});

// import { Identity } from '@dfinity/agent';

// export type Options = Readonly<{
//     canisterId: string;
//     identity?: Identity;
//     queryFunctionName?: string;
//     mutationFunctionName?: string;
// }>;


const TAGS = ["Action",
"Adventure",
"Animation",
"Comedy",
"Crime",
"Documentary",
"Drama",
"Horror",
"Mystery",
"Thriller",
"TV Movie",
"War"]
async function createTag(tag) {
    const result = await mutation(gql`
        mutation ($tag: String!) {
            createTag(input: {
                name: $tag
            }) {
                id,
                name
            }
        }
    `, {
        tag
    });

    const user = result.data.createUser;

    return user;
}
TAGS.forEach(t => {console.log(t); console.log(createTag(t))});