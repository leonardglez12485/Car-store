import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import {v4 as uuid} from 'uuid';
import { CreateCarDTO, UpdateCarDTO } from './dto';
import { Car } from './interfaces/car.interface';
//import { ChildProcess } from 'child_process';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // }
    ];

    findAll(){
        return this.cars;
    }

    findOneById(id: string){
        const carro = this.cars.find(carro => carro.id === id);
        if(!carro)
        throw new NotFoundException(`Cars whit Id ${id} Not Found!!!!!!`);
       return carro;
    }
 
    crate (createCarDTO: CreateCarDTO){
        const carro = {
          id: uuid(),
        //   brand: createCarDTO.brand,
        //   model: createCarDTO.model
        //opcional(funciona igual, nos ahorramos lineas de codigo y queda mas limpio le codigo)
        ...createCarDTO
        }
        this.cars.push(carro)
        return carro;
    }

    update (id:string, updateCarDTO: UpdateCarDTO){
        let carDB = this.findOneById( id );
        if( updateCarDTO.id && updateCarDTO.id !== id )
            throw new BadRequestException(`Car id is not valid inside body`);

        this.cars = this.cars.map( car => {

            if ( car.id === id ) {
                carDB = {...carDB,...updateCarDTO, id}
               return carDB;
            }

            return car;
        })
        
        return carDB;
    }

    delete (id:string){
     this.findOneAndDelete(id);
    }

    findOneAndDelete(id: string){
        const carro = this.cars.find(carro => carro.id === id);
        if(!carro)
        throw new NotFoundException(`Cars whit Id ${id} Not Found!!!!!!`);
        this.cars= this.cars.filter(carr =>carr!= carro); 
        return console.log('deleted');
    }
    fillBrandsWhitSeedData( carsSEED: Car []){
        return this.cars = carsSEED;
       }
}
