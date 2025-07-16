import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';

@Module({
  // É necessário injetar o módulo do TypeORM no módulo para poder utilizar o Repository no constructor do Service
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CitiesController],
  providers: [CitiesService],
  // (opcional) Este trecho exporta o service e o mesmo módulo para o que importar este módulo de Cidades
  exports: [CitiesService, TypeOrmModule],
})
export class CitiesModule {}
