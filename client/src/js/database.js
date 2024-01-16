import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Update (PUT) the database', content);

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('content', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('content', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('content');

  // Use the .put() method to update the database.
  const request = store.put({content:content});

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result?.value;
}



// method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('content', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('content', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('content');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
}
initdb();
