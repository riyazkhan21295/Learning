import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
@UseGuards(BeltGuard)
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}

  @Get() // /ninjas
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    try {
      return this.ninjaService.getNinjas(weapon);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Get(':id') // /ninjas/:id
  getNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjaService.getNinja(id);
  }

  @Post() // /ninjas
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }

  @Put(':id') // /ninjas/:id
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjaService.updateNinja(id, updateNinjaDto);
  }

  @Delete(':id') // /ninjas/:id
  removeNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjaService.removeNinja(id);
  }
}
