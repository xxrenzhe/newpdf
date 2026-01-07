export type WorkspacePdfRecord = {
  fileName: string;
  blob: Blob;
  updatedAt: number;
};

const DB_NAME = 'newpdf';
const DB_VERSION = 1;
const STORE_NAME = 'pdf_workspace';

let dbPromise: Promise<IDBDatabase> | null = null;

function getDb(): Promise<IDBDatabase> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('IndexedDB is only available in the browser'));
  }
  if (!('indexedDB' in window)) {
    return Promise.reject(new Error('IndexedDB is not available in this browser'));
  }

  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Failed to open IndexedDB'));
  });

  return dbPromise;
}

function toBlob(data: ArrayBuffer | Uint8Array | Blob): Blob {
  if (data instanceof Blob) return data;
  if (data instanceof Uint8Array) {
    // Normalize to an ArrayBuffer (avoids TS/lib.dom generic incompatibilities with ArrayBufferLike).
    const copy = new Uint8Array(data);
    return new Blob([copy.buffer], { type: 'application/pdf' });
  }
  return new Blob([data], { type: 'application/pdf' });
}

export async function saveWorkspacePdf(
  key: string,
  fileName: string,
  data: ArrayBuffer | Uint8Array | Blob
): Promise<void> {
  const db = await getDb();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  const record: WorkspacePdfRecord = {
    fileName,
    blob: toBlob(data),
    updatedAt: Date.now(),
  };

  store.put(record, key);

  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onabort = () => reject(tx.error ?? new Error('IndexedDB transaction aborted'));
    tx.onerror = () => reject(tx.error ?? new Error('IndexedDB transaction failed'));
  });
}

export async function loadWorkspacePdf(key: string): Promise<WorkspacePdfRecord | null> {
  const db = await getDb();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const request = store.get(key);

  const record = await new Promise<WorkspacePdfRecord | undefined>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as WorkspacePdfRecord | undefined);
    request.onerror = () => reject(request.error ?? new Error('Failed to read from IndexedDB'));
  });

  return record ?? null;
}

export async function deleteWorkspacePdf(key: string): Promise<void> {
  const db = await getDb();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  store.delete(key);

  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onabort = () => reject(tx.error ?? new Error('IndexedDB transaction aborted'));
    tx.onerror = () => reject(tx.error ?? new Error('IndexedDB transaction failed'));
  });
}
