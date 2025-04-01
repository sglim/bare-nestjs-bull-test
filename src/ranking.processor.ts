import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { promisify } from 'util';

// ranking-processor.ts
@Processor('rank')
export class RankingProcessor {
  @Process({
    name: 'Job',
    concurrency: 5,
  })
  async transcode(job: Job<string[]>) {
    console.log('start job. It takes 10 seconds');
    await promisify(setTimeout)(10000);
    console.log('end job');
    await job.progress(100);
    return 'Done';
  }
}
