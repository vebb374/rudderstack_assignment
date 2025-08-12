import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Page, Browser } from 'playwright';
import { LoginPage } from '../page-objects/LoginPage';
import { DashboardPage } from '../page-objects/DashboardPage';
import { DestinationPage } from '../page-objects/DestinationPage';

export interface ICustomWorld extends World {
  browser?: Browser;
  page?: Page;
  loginPage?: LoginPage;
  dashboardPage?: DashboardPage;
  destinationPage?: DestinationPage;
  dataPlaneUrl?: string;
  writeKey?: string;
  initialEventCount?: number;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
