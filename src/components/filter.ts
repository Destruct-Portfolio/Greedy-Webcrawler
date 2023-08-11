import {matcher} from 'glob-url';
import fs from 'fs'
export function count_matching_urls(urlList: Array<string>) {
  const patterns = [
    /^https:\/\/(www.)?fave\.co\/.*/,
    /^https:\/\/(www.)?anrdoezrs\.net\/click\/.*/,
    /^https:\/\/(www.)?kqzyfj\.com\/click\/.*/,
    /^https:\/\/(www.)?dpbolvw\.net\/click\/.*/,
    /^https:\/\/(www.)?tkqlhce\.com\/click\/.*/,
    /^https:\/\/(www.)?jdoqocy\.com\/click\/.*/,
    /^https:\/\/(www.)?expedia\.com\/.*/,
    /^https:\/\/(www.)?hotelscombined\.com\/.*/,
    /^https:\/\/(www.)?hotels\.com\/.*/,
    /^https:\/\/(www.)?hoteis\.com\/.*/,
    /^https:\/\/(www.)?vrbo\.com\/.*/,
    /^https:\/\/(www.)?booking\.com\/.*/,
    /^https:\/\/(www.)?tripadvisor\.com\/.*/,
    /^https:\/\/(www.)?airbnb\.com\/.*/,
    /^https:\/\/(www.)?kayak\.com\/.*/,
    /^https:\/\/(www.)?abritel\.fr\/.*/,
    /^https:\/\/(www.)?www\.stayz\.com\.au\/.*/,
    /^https:\/\/(www.)?tp\.st\/.*/,
    /^https:\/\/(www.)?tp\.media\/.*/,
    /^https:\/\/(www.)?prf\.hn\/.*/,
    /^https:\/\/(www.)?skimresources\.com\/.*/,
    /^https:\/\/(www.)?awin1\.com\/.*/,
    /^https:\/\/(www.)?stay22\.com\/.*/,
];

  const countMap = new Map();
  for (const url of urlList) {
    for (const pattern of patterns) {
      if (pattern.test(url)) {
        if (countMap.has(pattern)) {
          countMap.set(pattern, countMap.get(pattern) + 1);
        } else {
          countMap.set(pattern, 1);
        }
        break;
      }
    }
  }

    console.log(countMap)
  return Object.fromEntries(countMap);
}