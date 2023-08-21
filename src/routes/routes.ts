import { Dataset, KeyValueStore, createPuppeteerRouter } from 'crawlee';
import { load_links } from '../components/link.js';
import dotenv from 'dotenv';
dotenv.config()

const DOMAINS = process.env.STARTING_URL!
    .split(',')
    .map(url=>new URL(url).origin)
    .map(url=>url+'/*')

export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ enqueueLinks, log, request }) => {
    log.info(`Enqueueing new [${request.url}].`);

    await enqueueLinks({
        globs: [ ...DOMAINS ],
        label: 'explore',
    });


});

router.addHandler('explore', async ({ request, page, log, enqueueLinks }) => {
    const title = await page.title();
    log.info(`Exploring ${title}`, { url: request.loadedUrl });

    const links = await load_links(page)
    const store = await KeyValueStore.open('scavenged-links');
    const old_links = await store.getValue('links') as Array<string>
    await store.setValue('links', [
        ...old_links,
        ...links
    ]); 

    await enqueueLinks()
});