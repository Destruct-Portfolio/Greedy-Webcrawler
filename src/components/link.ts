import { Page } from "puppeteer";

export async function load_links(page: Page){
    return await page.evaluate(()=> {
        let elements = document.querySelectorAll('a');
        let links = []
        for (const element in elements) {
            let url = elements[element].href
            if(url){
                links.push(url)
            }
        }
        return links
    })
}