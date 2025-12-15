// Dictionary API servers and related functions

import { ApiEndpoint } from './api-endpoint';
import { fetchApiData } from './api-endpoint';

interface DictionaryApiEndpoint extends ApiEndpoint {
    queryParam: string;
};


const wiktionaryApi: DictionaryApiEndpoint = {
    name: 'Wiktionary API',
    category: 'Dictionary',
    queryParam: '',
    url: 'https://en.wiktionary.org/w/api.php?action=query&format=json&prop=extracts&titles=${word}&exintro=1&explaintext=1',
    method: 'GET',
    contentType: 'application/json',
    description: 'Fetches definitions and information from Wiktionary. Replace {word} with the desired term.'
};

export async function getDefinitionWiktionary(word: string): Promise<string> {
    let wiki: DictionaryApiEndpoint = wiktionaryApi;
    wiki.queryParam = word;
    let urlWithWord = wiki.url.replace('${word}', encodeURIComponent(word));
    wiki.url = urlWithWord;
    const response = await fetchApiData(wiki);
    let data = response.json();
    return data;
}

export { wiktionaryApi };
