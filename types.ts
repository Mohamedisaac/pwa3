
export interface DictionaryEntry {
  word: string;
  definition: string;
}

export interface Dictionary {
  name: string;
  entries: DictionaryEntry[];
}

export interface SearchResult extends DictionaryEntry {
  dictionaryName: string;
}

export enum Tab {
  Search = 'Search',
  Browse = 'Browse',
}
