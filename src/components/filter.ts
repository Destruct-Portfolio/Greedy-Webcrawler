import {matcher} from 'glob-url';
import fs from 'fs'
export function count_matching_urls(urlList: Array<string>) {
  const patterns = [
    'https://fave.co/*',
    'https://anrdoezrs.net/click/*',
    'https://kqzyfj.com/click/*',
    'https://dpbolvw.net/click/*',
    'https://tkqlhce.com/click/*',
    'https://jdoqocy.com/click/*',
    'https://expedia.com/*',
    'https://hotelscombined.com/*',
    'https://hotels.com/*',
    'https://hoteis.com/*',
    'https://vrbo.com/*',
    'https://booking.com/*',
    'https://tripadvisor.com/*',
    'https://airbnb.com/*',
    'https://kayak.com/*',
    'https://abritel.fr/*',
    'https://www.stayz.com.au/*',
    'https://tp.st/*',
    'https://tp.media/*',
    'https://prf.hn/*',
    'https://skimresources.com/*',
    'https://awin1.com/*',
    'https://stay22.com/*',
  ];

  const countMap = new Map();

  for (const url of urlList) {
    for (const pattern of patterns) {
      if (matcher.match(pattern, url)) {
        if (countMap.has(pattern)) {
          countMap.set(pattern, countMap.get(pattern) + 1);
        } else {
          countMap.set(pattern, 1);
        }
        break;
      }
    }
  }

  return Object.fromEntries(countMap);
}