// File defines API endpoints and related information and provides functions to read/write this data from/to a file. Also includes a function to fetch data from the defined API endpoints.

import fs from 'fs';
import path from 'path';

//global variables
let apiCollectionString: string = '';
export let allEndpoints: Array<ApiCollection> = [];
export const apiFilePath: string = __dirname;
export const apiFileName: string = 'api-endpoints.json';

// Type definition for an API endpoint
export interface ApiEndpoint {
    name: string;
    category: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    contentType: string;
    description?: string;
}

//Type definition for API Collection
export type ApiCollection = {
    endpoints: ApiEndpoint[];
}

// Function to build API endpoint collection from file
export function buildApiEndpointCollection(filePathDir: string = apiFilePath, fileName: string = apiFileName): ApiCollection {
    apiCollectionString = readApiEndpointsFromFile(filePathDir, fileName);
    const collection: ApiCollection = JSON.parse(apiCollectionString);
    allEndpoints = [collection];
    return collection;
}

//Function to fetch data from an API endpoint
export function fetchApiData(endpoint: ApiEndpoint): Promise<Response> {
    return fetch(endpoint.url, {
        method: endpoint.method,
        headers: {
            'Content-Type': endpoint.contentType
        }
    });
}
// Function to write API endpoint data to a file
export function writeApiEndpointsToFile(collection: ApiCollection, filePathDir: string = apiFilePath, fileName: string = apiFileName): void {
    const filePathWithName = path.join(filePathDir, fileName);
    const jsonString = JSON.stringify(collection, null, 2);
    fs.writeFileSync(filePathWithName, jsonString, 'utf-8');
}

// Function to read API endpoint data from a file
export function readApiEndpointsFromFile(filePathToApiDir: string = apiFilePath, fileName: string = apiFileName): string {
    const filePath = path.join(filePathToApiDir, fileName);
    const data = fs.readFileSync(filePath, 'utf-8');
    return data;
}
