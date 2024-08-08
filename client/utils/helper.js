

// Function to pluralize a word based on the count
export function pluralize(name, count) {
    return count === 1 ? name : name + 's';
  }
  
  // Function to interact with IndexedDB
  export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('my-database', 1); 
      let db, tx, store;
  
      request.onupgradeneeded = function (e) {
        const db = request.result;
        if (!db.objectStoreNames.contains('dish')) {
          db.createObjectStore('dish', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('cart')) {
          db.createObjectStore('cart', { keyPath: 'id' });
        }
      };
  
      request.onerror = function (e) {
        console.log('Error', e);
        reject(e);
      };
  
      request.onsuccess = function (e) {
        db = request.result;
        tx = db.transaction(storeName, 'readwrite');
        store = tx.objectStore(storeName);
  
        db.onerror = function (e) {
          console.log('Error', e);
          reject(e);
        };
  
        switch (method) {
          case 'put':
            console.log('Putting object in IndexedDB:', object);
          console.log('Object keys:', Object.keys(object));
          console.log('Object ID:', object.id);
          if (typeof object.id !== 'string') {
            console.log('Converting ID to string');
            object.id = String(object.id);
            console.log('Converted ID:', object.id);
          }
          

            store.put(object);
            resolve(object);
            break;
          case 'get':
            const all = store.getAll();
            all.onsuccess = function () {
              resolve(all.result);
            };
            break;
          case 'delete':
            store.delete(object._id);
            resolve(object);
            break;
          default:
            console.log('No valid method');
            reject('No valid method');
            break;
        }
  
        tx.oncomplete = function () {
          db.close();
        };
      };
    });
  }
  