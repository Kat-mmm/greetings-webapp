import pgPromise from 'pg-promise';
import 'dotenv/config';

const username = 'postgres';
const password = process.env.Password;
const host = 'localhost';
const port = 5432;
const databaseName = 'greetingsdb';

const encodedUsername = encodeURIComponent(username);
const encodedPassword = encodeURIComponent(password);

const connection = process.env.DATABASE_URL || `postgresql://${encodedUsername}:${encodedPassword}@${host}:${port}/${databaseName}`;

const schema = 'greetings';

const db = pgPromise()(connection);

export default function GreetingsDatabase(){
    async function addUser(name){
        await db.none(`INSERT INTO ${schema}.users (username, greet_count) VALUES ($1, $2) ON CONFLICT (username) DO UPDATE SET greet_count = ${schema}.users.greet_count + 1`, [name, 1]);
    }

    async function getUsers(){
        let results = await db.any(`SELECT username FROM ${schema}.users`);

        return results;
    }

    async function getUserCount(user){
        let result = await db.oneOrNone(`SELECT greet_count FROM ${schema}.users WHERE username = $1`, [user]);
        
        return result;
    }

    async function resetAll(){
        await db.none(`DELETE FROM ${schema}.users`);
    }

    async function getAllGreetedUsers(){
        let result = await db.oneOrNone(`SELECT COUNT(*) FROM ${schema}.users`);

        return result;
    }

    return{
        addUser,
        getUsers,
        getUserCount,
        resetAll,
        getAllGreetedUsers
    }
}


