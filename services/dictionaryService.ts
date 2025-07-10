
import { Dictionary, DictionaryEntry } from '../types';

const DICTIONARY_FILES = ['biology.json', 'geography.json', 'somali.json'];

function formatDictionaryName(filename: string): string {
  const name = filename.replace('.json', '');
  return name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' ');
}

export async function loadAllDictionaries(): Promise<Dictionary[]> {
  try {
    const dictionaries = await Promise.all(
      DICTIONARY_FILES.map(async (file) => {
        const response = await fetch(`./dictionaries/${file}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${file}: ${response.statusText}`);
        }
        const data: Record<string, string> = await response.json();
        
        const entries: DictionaryEntry[] = Object.entries(data).map(([word, definition]) => ({
          word,
          definition,
        }));

        return {
          name: formatDictionaryName(file),
          entries,
        };
      })
    );
    return dictionaries;
  } catch (error) {
    console.error("Error loading dictionaries:", error);
    throw new Error("Could not load dictionary data.");
  }
}
