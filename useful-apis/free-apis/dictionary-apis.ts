// Dictionary API servers and related functions

import { ApiEndpoint } from './api-endpoint';
import { fetchApiData } from './api-endpoint';

interface DictionaryRequest  {
    endpoint: ApiEndpoint;
    queryParam: string;
};

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





// Generic function to get definition using a DictionaryRequest
async function getDefinitionWithDictionaryRequest(dictRequest: DictionaryRequest, urlBuilder: Function,definitionParser: Function): Promise<WordDefinition> {
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




// Open Dictionary API implementation
