// File to test dictionary-api.ts functions

import { getDefinitionWiktionary, wiktionaryApi } from './dictionary-apis';

// Test fetching definition from Wiktionary API
const testWord = 'example';
getDefinitionWiktionary(testWord)
    .then(definition => {
        console.log(`Definition of "${testWord}":`, definition);
    })
    .catch(error => {
        console.error('Error fetching definition:', error);
    });
