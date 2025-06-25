import { openDB } from 'idb';

const DB_NAME = 'storyverse-db';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'favorite-stories';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteStoryIdb = {
  async get(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAll() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async put(story) {
    return (await dbPromise).put(OBJECT_STORE_NAME, story);
  },
  async delete(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteStoryIdb;
