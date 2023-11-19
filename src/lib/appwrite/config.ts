import { Client, Databases, Storage, Account, Avatars } from "appwrite";

export const appwriteConfig = {
    url: String(import.meta.env.VITE_APPWRITE_PROJECT_URL),
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    storageId: String(import.meta.env.VITE_APPWRITE_STORAGE_ID),
    usersCollectionId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    postsCollectionId: String(import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID),
    savesCollectionId: String(import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID),
}

export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url)
export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);
export const avatars = new Avatars(client);