import { defineConfig } from '@playwright/test';
import chromium from '@sparticuz/chromium';
export default defineConfig({testDir:'./e2e',workers:1,use:{baseURL:'http://127.0.0.1:5173',browserName:'chromium',headless:true,launchOptions:{executablePath:await chromium.executablePath(),args:chromium.args.filter(arg=>arg!=='--single-process')}},reporter:'list'});
