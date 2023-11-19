import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import {ID, Query} from 'appwrite'

export const  createUserAccount = async (user: INewUser) => {    
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        )

        if(!newAccount) throw Error; 

        const avatarUrl = avatars.getInitials(user.name);
        const newUser = await setUserToDB ({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username, 
            imageUrl: avatarUrl
        })
        console.log('api', newUser);
        
        return newUser
    } catch (error) {
        console.log(error);
        return error;
        
    }
}

const setUserToDB = async (user: {  
    accountId: string,
    name: string,
    email: string,
    imageUrl: URL,
    username?: string,
}) => {
    try {
        console.log('User', user);
        
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            user
        )
        console.log('api', newUser);
        
        return newUser;
    } catch (error) {
        console.log(error);
        
    }
}

export const signInAccount = async (user: {
    email:string, password: string
}) => {
    try {
        const session = await account.createEmailSession(user.email, user.password)
        return session;
    } catch (error) {
        console.log(error);
        
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log({error});
    }
}


export const signOutAccount = async () => {
    try {
        const session = await account.deleteSession('current');
        return session    
    } catch (error) {
        console.log({error});
        return error
    }
}