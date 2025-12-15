//File to test api-endpoint.ts functions

import { buildApiEndpointCollection, fetchApiData, ApiEndpoint } from './api-endpoint';

// Test building API endpoint collection
const apiCollection = buildApiEndpointCollection();
console.log('API Collection:', apiCollection);

// Test fetching data from an API endpoint
const testEndpoint: ApiEndpoint = {
    name: 'Test API',
    category: 'Testing',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'GET',
    description: 'A test API endpoint'
};

fetchApiData(testEndpoint)
    .then(response => response.json())
    .then(data => {
        console.log('Fetched Data:', data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
