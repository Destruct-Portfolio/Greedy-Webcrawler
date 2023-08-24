/**
 * This template is a production ready boilerplate for developing with `CheerioCrawler`.
 * Use this to bootstrap your projects using the most up-to-date code.
 * If you're looking for examples or want to learn more, see README.
 */

// For more information, see https://docs.apify.com/sdk/js
import { Actor, log } from 'apify';
// For more information, see https://crawlee.dev
import { KeyValueStore, PuppeteerCrawler, Configuration } from 'crawlee';
import { router } from './routes/routes.js';
import { count_matching_urls } from './components/filter.js';
import dotenv from 'dotenv';
dotenv.config()

import fs from 'fs'

// Initialize the Apify SDK
await Actor.init();

const startUrls = [...process.env.STARTING_URL!.split(',')];


const crawler = new PuppeteerCrawler({
    requestHandler: router,
    navigationTimeoutSecs: 30,
    maxRequestRetries: 4
});

const store = await KeyValueStore.open('scavenged-links');
await store.setValue('links', []);

await crawler.run(startUrls);

log.info('Counting matches from scavenged links ...')
let links = await store.getValue('links') as Array<string>

log.info('Exporting results ...')
fs.writeFileSync('match_count.json', JSON.stringify(count_matching_urls(links), null, 2))
fs.writeFileSync('match_count.csv', 'website,count\n'+count_matching_urls(links).map(entry=>entry.join(',')).join('\n'))


// Exit successfully
await Actor.exit();
