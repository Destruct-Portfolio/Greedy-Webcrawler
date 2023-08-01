import { Dataset, KeyValueStore, createPuppeteerRouter } from 'crawlee';

export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ enqueueLinks, log, request, page }) => {
    log.info(`Enqueueing new [${request.url}].`);
    await enqueueLinks({
        globs: [  "https://fave.co/*",  "https://anrdoezrs.net/click/*",  "https://kqzyfj.com/click/*",  "https://dpbolvw.net/click/*",  "https://tkqlhce.com/click/*",  "https://jdoqocy.com/click/*",  "https://expedia.com/*",  "https://hotelscombined.com/*",  "https://hotels.com/*",  "https://hoteis.com/*",  "https://vrbo.com/*",  "https://booking.com/*",  "https://tripadvisor.com/*",  "https://airbnb.com/*",  "https://kayak.com/*",  "https://abritel.fr/*",  "https://www.stayz.com.au/*",  "https://tp.st/*",  "https://tp.media/*",  "https://prf.hn/*",  "https://skimresources.com/*",  "https://awin1.com/*",  "https://stay22.com/*"],
        label: 'find',
    });
    await enqueueLinks({
        globs: ['https://www.travellingking.com/*'],
        label: 'explore',
    });

    

    const title = await page.title();
    log.info(`Exploring ${title}`, { url: request.loadedUrl });


    await Dataset.pushData({
        url: request.loadedUrl,
        title,
    });

});

router.addHandler('explore', async ({ request, page, log, enqueueLinks }) => {
    const title = await page.title();
    log.info(`Exploring ${title}`, { url: request.loadedUrl });

    await enqueueLinks();

    await Dataset.pushData({
        url: request.loadedUrl,
        title,
    });
});

router.addHandler('find', async ({ request, page, log, enqueueLinks }) => {
    const title = await page.title();
    log.info(`Found ${title}`, { url: request.loadedUrl });

    await enqueueLinks();

    const store = await KeyValueStore.open('scavenged-links');
    const links = await store.getValue('links') as Array<string>
    await store.setValue('links', [
        ...links,
        request.url
    ]);  
});