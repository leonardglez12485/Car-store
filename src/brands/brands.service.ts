import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuid} from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {

  private brands: Brand [] = [
  // {
  //   id:uuid(),
  //   name:'Toyota',
  //   createdAt: new Date().getDate() 
  // }
  ]

  create(createBrandDto: CreateBrandDto) {
    const {name} = createBrandDto
    const brand= {
      id: uuid(),
      createdAt: new Date().getTime(),
      name: name.toLocaleLowerCase(),
    }
    this.brands.push(brand);
    return {
      brand
    }
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand=> brand.id === id);
    if(!brand)
    throw new NotFoundException(`Brand whit Id ${id} Not Found!!!!!!`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let branDb = this.findOne(id);
    this.brands = this.brands.map(brand => {
      if(brand.id===id){
     branDb.updatedAt = new Date().getTime();
     branDb = {...branDb, ...updateBrandDto}
     return branDb;
      }
      return brand;
    })
  }

  remove(id: string) {
  this.findOneAndDelete(id);
  }

  findOneAndDelete(id: string){
    const brand = this.brands.find(br => br.id === id);
    if(!brand)
    throw new NotFoundException(`Cars whit Id ${id} Not Found!!!!!!`);
    this.brands= this.brands.filter(br =>br!= brand); 
    return console.log('deleted');
}

 fillBrandsWhitSeedData( brandsSEED: Brand []){
  return this.brands = brandsSEED;
 }
}
