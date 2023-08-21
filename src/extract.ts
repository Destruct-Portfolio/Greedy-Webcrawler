import fs from 'fs'
import { KeyValueStore } from 'crawlee';

import { count_matching_urls } from './components/filter.js';
import { log } from 'apify';

const store = await KeyValueStore.open('scavenged-links');

log.info('Counting matches from scavenged links ...')
let links = await store.getValue('links') as Array<string>

log.info('Exporting results ...')
fs.writeFileSync('match_count.json', JSON.stringify(count_matching_urls(links), null, 2))
fs.writeFileSync('match_count.csv', 'website,count\n'+count_matching_urls(links).map(entry=>entry.join(',')).join('\n'))
