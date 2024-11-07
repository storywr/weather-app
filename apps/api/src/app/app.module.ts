import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { WeatherController } from '../weather/weather.controller';
import { WeatherService } from '../weather/weather.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class AppModule {}
