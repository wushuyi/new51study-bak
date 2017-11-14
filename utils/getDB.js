let db = null;

export default async function () {
  if (db) {
    return db;
  }
  let loki = await import('lokijs');
  let LokiIndexedAdapter = await import('lokijs/src/loki-indexed-adapter');
  let idbAdapter = new LokiIndexedAdapter('wyxdb');
  let getDB = () => {
    return new Promise((resolve, reject) => {
      let db = new loki("test.db", {
        adapter: idbAdapter,
        autoload: true,
        autoloadCallback: () => {
          resolve(db);
        },
        autosave: true,
        autosaveInterval: 4000
      });
    });
  };
  db = await getDB();
  return db;
}