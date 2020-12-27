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
            let stickyNote : StickyNote = {id: uuidv4(), heading: 'New', body: 'Write your note here.', lastModified: Date.now()}
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
            let stickyNotes : Array<StickyNote> = event.target.result.sort((a : StickyNote, b : StickyNote) => b.lastModified - a.lastModified); // sort the results so that the most recently modified sticky note is first.
            console.log(stickyNotes)
            resolve(stickyNotes);
        }
        objectStore.onerror = (event : any) => {
            reject(event.target.error);
        }
    });
}
const createStickyNote = async () : Promise<any> => {
    let db = await connect();
    return await new Promise((resolve, reject) => {
        let transaction :IDBTransaction = db.transaction(database.objectStoreName, 'readwrite');
        let stickynote : StickyNote = { id: uuidv4(), heading: 'New', body: 'Write your note here.', lastModified: Date.now()}
        let objectStore = transaction.objectStore(database.objectStoreName).add(stickynote);
        objectStore.onsuccess = (event : any) => {
            resolve(event.target.result);
        }
        objectStore.onerror = (event : any) => {
            reject(event.target.error);
        }
    });
}
const updateStickyNote = async (stickynote: StickyNote) : Promise<any> => {
    let db = await connect();
    return await new Promise((resolve, reject) => {
        let transaction = db.transaction(database.objectStoreName, 'readwrite').objectStore(database.objectStoreName);
        let objectStore = transaction.put(stickynote);
        objectStore.onsuccess = (event : any) => {
            resolve(event.target.result);
        }
        objectStore.onerror = (event: any) => {
            reject(event.target.error);
        }
    });

}
const deleteStickyNote = async (key : string) : Promise<any> => {
    let db = await connect();
    return await new Promise((resolve, reject) => {
        let transaction = db.transaction(database.objectStoreName, 'readwrite');
        let objectStore = transaction.objectStore(database.objectStoreName).delete(key);
        objectStore.onsuccess = (event : any) => {
            resolve(event.target.result);
        }
        objectStore.onerror = (event : any) => {
            reject(event.target.error);
        }
    });
}

export { getAllStickyNotes, createStickyNote, updateStickyNote, deleteStickyNote }