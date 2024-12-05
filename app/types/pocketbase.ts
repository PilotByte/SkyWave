// Type for PocketBase single fetched data extends provided type
type PocketBaseRecord<T> = T & {
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
};
