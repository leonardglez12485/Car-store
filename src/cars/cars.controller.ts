import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO, UpdateCarDTO } from './dto';


@Controller('cars')
export class CarsController {

  constructor(
    private readonly carsSevice : CarsService
  ){}
    @Get()
    getallCars(){
        return this.carsSevice.findAll();
    }

  
    @Get(':id')
    getCarsById(@Param('id', ParseUUIDPipe) id:string){
       console.log({id});
       return this.carsSevice.findOneById(id);
    }

    @Post()
    crearCar(@Body() createCarDTO: CreateCarDTO){
        this.carsSevice.crate(createCarDTO);
    }


    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id:string,
        @Body() updateCarDTO: UpdateCarDTO) 
        {
        return this.carsSevice.update(id, updateCarDTO);
        }

    @Delete(':id')
    deleteCar(@Param('id', ParseUUIDPipe) id:string){
        return this.carsSevice.delete(id);
    }


}
