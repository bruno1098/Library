import { Injectable } from "@nestjs/common";
import {chromium} from 'playwright-core';

@Injectable()
export class RpaService{
    async fillForm(data: any){
        const browser = await chromium.launch();
        const page = await browser.newPage();

        try{
            await page.goto('https://localhost:4200/authors/new');
            await page.fill('input[name="name"]', data.name);
            await page.fill('input[name="birthDate"]', data.birthDate);
            await page.click('button[type="submit"]');

            const result = await page.textContent('success-message');
            await browser.close();
            return result;
        }catch(error){
            await browser.close();
            throw error;
        }
    }
}