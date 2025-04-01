import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankingProcessor } from './ranking.processor';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: 'localhost',
          port: 6379,
          db: 5,
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'rank',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RankingProcessor],
})
export class AppModule {}
