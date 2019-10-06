import { openDB } from 'idb';

const DATABASE_NAME = 'RAJOBS';
const DATABASE_VERSION = 1;
const JOBS =  [
    {id: 1, category: 'programming', price: '$20', bookmarked: true, name: 'JS Developer', location: 'yerevan', type: 'full'},
    {id: 2, category: 'programming', price: '$50', bookmarked: true, name: 'JS Developer', location: 'amsterdam', type: 'full'},
    {id: 3, category: 'design', price: '$30', bookmarked: false, name: 'UX Designer', location: 'amsterdam', type: 'full'},
    {id: 4, category: 'programming', price: '$50', bookmarked: true, name: 'Full Stack', location: 'usaLa', type: 'part'},
    {id: 5, category: 'design', price: '$30', bookmarked: false, name: 'UX Designer', location: 'usaNewYork', type: 'full'},
    {id: 6, category: 'programming', price: '$20', bookmarked: true, name: 'JAVA Developer', location: 'amsterdam', type: 'part'},
    {id: 7, category: 'architecture', price: '$30', bookmarked: true, name: 'Architect', location: 'amsterdam', type: 'per'},
    {id: 8, category: 'programming', price: '$50', bookmarked: true, name: 'C# Developer', location: 'usaNewYork', type: 'full'},
    {id: 9, category: 'architecture', price: '$60', bookmarked: true, name: 'Architect Building', location: 'yerevan', type: 'per'},
    {id: 10, category: 'programming', price: '$60', bookmarked: true, name: '.Net Developer', location: 'amsterdam', type: 'part'}
];

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('jobs')) { // if there's no "jobs" store
            const store = db.createObjectStore('jobs', {keyPath: 'id', autoIncrement: true});
            for (let job of JOBS) {
                store.add({
                    id: job.id,
                    category: job.category,
                    price: job.price,
                    bookmarked: job.bookmarked,
                    name: job.name,
                    location: job.location,
                    type: job.type,
                });
            }
        }
    },
});

const DBOperations = {
    async getAll() {
        return (await dbPromise).getAll('jobs');
    },
    async get(key) {
        let tx = (await dbPromise).transaction("jobs", "readwrite");
        let store = tx.objectStore("jobs");
        return store.get(key);
    },
    async set(val) {
        let tx = (await dbPromise).transaction("jobs", "readwrite");
        let store = tx.objectStore("jobs");
        return store.put(val);
    },
    async delete(key) {
        let tx = (await dbPromise).transaction("jobs", "readwrite");
        let store = tx.objectStore("jobs");
        return store.delete(key);
    },
    async clear() {
        return (await dbPromise).clear('jobs');
    },
};

export {
    JOBS,
    DBOperations
}
