// Dictionary API servers and related functions
import { ApiEndpoint } from './api-endpoint';
import { fetchApiData } from './api-endpoint';

// Import API keys from environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '/Users/louisc/coding-toolkit/env-files/api-keys/.env-dictionary-apis' });
// Actual key constants
const MERRIAM_WEBSTER_COLLEGIATE_KEY = process.env.MERRIAM_WEBSTER_COLLEGIATE_KEY || '';
const MERRIAM_WEBSTER_HIGH_SCHOOL_KEY = process.env.MERRIAM_WEBSTER_HIGH_SCHOOL_KEY || '';

// ##### GENERIC DICTIONARY API TYPES #####
// Generic Dictionary Request interface
interface DictionaryRequest {
    endpoint: ApiEndpoint;
    queryParam: string;
};
// Word Definition interface
export interface WordDefinition {
    word: string;
    definition: string;
}


// ##### WIKTIONARY API IMPLEMENTATION #####
// Wiktionary API endpoint definition //
const wiktionaryApi: ApiEndpoint = {
    name: 'Wiktionary API',
    category: 'Dictionary',
    url: 'https://en.wiktionary.org/w/api.php?action=query&format=json&origin=*&prop=extracts&titles=${word}&exintro=1&explaintext=1',
    method: 'GET',
    description: 'Fetches definitions and information from Wiktionary. Replace {word} with the desired term.'
};

// Function to build the Wiktionary URL
function wiktionaryUrlBuilder(word: string): string {
    return wiktionaryApi.url.replace('${word}', encodeURIComponent(word));
}

// Function to extract definition from Wiktionary API response
function getDefinitionFromWiktionaryData(jsonData: any): string {
    const pages = jsonData.query.pages;
    const pageId: string = Object.keys(pages)[0];
    const extract: string = pages[pageId].extract;
    console.log('extract:', extract);
    return extract || `No definition found!`;
}
// Function to get definition from Wiktionary API
async function getDefinitionWiktionary(word: string): Promise<WordDefinition> {
    const dictRequest: DictionaryRequest = {
        endpoint: wiktionaryApi,
        queryParam: word
    };
    return getDefinitionWithDictionaryRequest(dictRequest, wiktionaryUrlBuilder, getDefinitionFromWiktionaryData);
}
// Exports for Wiktionary API
export { wiktionaryApi, getDefinitionWiktionary };

// ##### OPEN DICTIONARY API IMPLEMENTATION #####
const openDictionaryApi: ApiEndpoint = {
    name: 'Open Dictionary API',
    category: 'Dictionary',
    url: 'https://api.dictionaryapi.dev/api/v2/entries/en/${word}',
    method: 'GET',
    description: 'Fetches definitions from the Open Dictionary API. Replace {word} with the desired term.'
};

// Function to build the Open Dictionary URL
function openDictionaryUrlBuilder(word: string): string {
    return openDictionaryApi.url.replace('${word}', encodeURIComponent(word));
}

// Function to extract definition from Open Dictionary API response
function getDefinitionFromOpenDictionaryData(jsonData: any): string {
    if (Array.isArray(jsonData) && jsonData.length > 0) {
        const meanings = jsonData[0].meanings;
        if (meanings && meanings.length > 0) {
            const definitions = meanings[0].definitions;
            if (definitions && definitions.length > 0) {
                return definitions[0].definition;
            }
        }
    } else {
        return `No definition found!`;
    }
    return `No definition found!`;
}

// Function to get definition from Open Dictionary API
async function getDefinitionOpenDictionary(word: string): Promise<WordDefinition> {
    const dictRequest: DictionaryRequest = {
        endpoint: openDictionaryApi,
        queryParam: word
    };
    return getDefinitionWithDictionaryRequest(dictRequest, openDictionaryUrlBuilder, getDefinitionFromOpenDictionaryData);
}

// Exports for Open Dictionary API
export { openDictionaryApi, getDefinitionOpenDictionary };

// ##### MERRIAM-WEBSTER DICTIONARY API IMPLEMENTATIONS #####

// Merriam-Webster Collegiate Dictionary API endpoint definition //
const merriamWebsterCollegiateApi: ApiEndpoint = {
    name: 'Merriam-Webster Collegiate Dictionary API',
    category: 'Dictionary',
    url: `https://www.dictionaryapi.com/api/v3/references/collegiate/json/\${word}?key=${MERRIAM_WEBSTER_COLLEGIATE_KEY}`,
    method: 'GET',
    description: 'Fetches definitions from the Merriam-Webster Collegiate Dictionary API. Replace {word} with the desired term.'
};

// Merriam-Webster High School Dictionary API endpoint definition //
const merriamWebsterHighSchoolApi: ApiEndpoint = {
    name: 'Merriam-Webster High School Dictionary API',
    category: 'Dictionary',
    url: `https://www.dictionaryapi.com/api/v3/references/highschool/json/\${word}?key=${MERRIAM_WEBSTER_HIGH_SCHOOL_KEY}`,
    method: 'GET',
    description: 'Fetches definitions from the Merriam-Webster High School Dictionary API. Replace {word} with the desired term.'
};

// Function to build the Merriam-Webster URL
function merriamWebsterUrlBuilder(word: string, isCollegiate: boolean): string {
    const api = isCollegiate ? merriamWebsterCollegiateApi : merriamWebsterHighSchoolApi;
    return api.url.replace('${word}', encodeURIComponent(word));
}

// Function to extract definition from Merriam-Webster API response
function getDefinitionFromMerriamWebsterData(jsonData: any): string {
    if (Array.isArray(jsonData) && jsonData.length > 0) {
        const firstEntry = jsonData[0];
        if (firstEntry.shortdef && firstEntry.shortdef.length > 0) {
            return firstEntry.shortdef[0];
        }
    }
    return `No definition found!`;
}

// Function to get definition from Merriam-Webster API
async function getDefinitionMerriamWebster(word: string, isCollegiate: boolean): Promise<WordDefinition> {
    const dictRequest: DictionaryRequest = {
        endpoint: isCollegiate ? merriamWebsterCollegiateApi : merriamWebsterHighSchoolApi,
        queryParam: word
    };
    const urlBuilder = (w: string) => merriamWebsterUrlBuilder(w, isCollegiate);
    return getDefinitionWithDictionaryRequest(dictRequest, urlBuilder, getDefinitionFromMerriamWebsterData);
}

// Exports for Merriam-Webster API
export { merriamWebsterCollegiateApi, merriamWebsterHighSchoolApi, getDefinitionMerriamWebster };

// ##### GENERIC FUNCTION TO HANDLE DICTIONARY REQUESTS #####
// Generic function to get definition using a DictionaryRequest
async function getDefinitionWithDictionaryRequest(dictRequest: DictionaryRequest, urlBuilder: Function, definitionParser: Function): Promise<WordDefinition> {
    const word = dictRequest.queryParam;
    const endpointWithWord: ApiEndpoint = {
        ...dictRequest.endpoint,
        url: urlBuilder(word)
    };

    const response = await fetchApiData(endpointWithWord);
    const data = await response.json();

    // Parse the JSON data to extract the definition
    const definitionText = definitionParser(data);

    const definition: WordDefinition = {
        word: word,
        definition: definitionText
    };
    return definition;
}
