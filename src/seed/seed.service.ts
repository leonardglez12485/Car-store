import { Injectable } from '@nestjs/common';
import { CarsService } from '../cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed ';

@Injectable()
export class SeedService {

  constructor (
    private readonly cars_Service: CarsService,
    private readonly brand_Service: BrandsService
  ){}
 
  populateDB() {
   this.cars_Service.fillBrandsWhitSeedData(CARS_SEED);
   this.brand_Service.fillBrandsWhitSeedData(BRANDS_SEED);
   return 'SEED Excecuted !!!'
  }

}
