import fs from 'fs'
import { KeyValueStore } from 'crawlee';

import { count_matching_urls } from './components/filter.js';
import { log } from 'apify';

const store = await KeyValueStore.open('scavenged-links');

log.info('Counting matches from scavenged links ...')
let links = await store.getValue('links') as Array<string>
links = count_matching_urls(links)

log.info('Exporting results ...')
fs.writeFileSync('match_count.json', JSON.stringify(links, null, 2))