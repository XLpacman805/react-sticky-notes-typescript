import { StickyNote } from '../types/index';
import { v4 as uuidv4 } from 'uuid';

const database = { 
    name: 'stickynotes',
    objectStoreName: 'stickynotes-object-store',
    objectStoreKeyPath: 'id',
    version: 1
}

const connect = async () : Promise<IDBDatabase> => {
    return await new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            reject('No IndexedDB found in Window.');
        }
    
        let connectionRequest = indexedDB.open(database.name, database.version);
        /**
         * The onupgradeneeded method is called upon the very first connection to the database and version, 
         * It will create an object store. 
         */
        connectionRequest.onupgradeneeded = (event: any) => {
            let db : IDBDatabase = event.target.result;
            let objectStore = db.createObjectStore(database.objectStoreName, {keyPath: database.objectStoreKeyPath});
            let stickyNote : StickyNote = {id: uuidv4(), heading: 'Title', body: 'Write your note here.' }
            objectStore.add(stickyNote);
        }
    
        connectionRequest.onsuccess = (event : any) => {
            let db :IDBDatabase = event.target.result;
            resolve(db);
        }

        connectionRequest.onerror = (event : any) => {
            reject(event.target.error);
        }
    });
}
const getAllStickyNotes = async () : Promise<Array<StickyNote>> => {
    let db = await connect();
    return await new Promise((resolve, reject) => {
        let transaction = db.transaction(database.objectStoreName, 'readonly');
        let objectStore = transaction.objectStore(database.objectStoreName).getAll();
        objectStore.onsuccess = (event : any) => {
            let stickyNotes : Array<StickyNote> = event.target.result;
            resolve(stickyNotes);
        }
        objectStore.onerror = (event : any) => {
            reject(event.target.error);
        }
    });
}
const createStickyNote = () => {}
const updateStickyNote = () => {}
const deleteStickyNote = () => {}

export { getAllStickyNotes, createStickyNote, updateStickyNote, deleteStickyNote }