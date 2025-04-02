import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { promisify } from 'util';

const job1Concurrency = 1;
const job2Concurrency = 1;

// ranking-processor.ts
@Processor('rank')
export class RankingProcessor {
  @Process({
    name: 'Job',
    concurrency: job1Concurrency,
  })
  async transcode(job: Job<string[]>) {
    console.log(
      'start job1. It takes 10 seconds',
      `Job1 concurrency: ${job1Concurrency}`,
    );
    await promisify(setTimeout)(10000);
    console.log('end job1');
    await job.progress(100);
    return 'Done';
  }

  @Process({
    name: 'Job2',
    concurrency: job2Concurrency,
  })
  async transcode2(job: Job<string[]>) {
    console.log(
      'start job2. It takes 10 seconds',
      `Job2 concurrency: ${job2Concurrency}`,
    );
    await promisify(setTimeout)(10000);
    console.log('end job2');
    await job.progress(100);
    return 'Done';
  }
}
