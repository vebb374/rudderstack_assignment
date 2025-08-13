import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Page, Browser } from 'playwright';


export interface ICustomWorld extends World {
  browser?: Browser;
  page?: Page;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);