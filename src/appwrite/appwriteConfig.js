import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // ✅ Appwrite endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // ✅ Project ID only

const account = new Account(client);
const databases = new Databases(client);

// Export your DB & Collection ID from the env
const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export { client, account, databases, DB_ID, COLLECTION_ID };
