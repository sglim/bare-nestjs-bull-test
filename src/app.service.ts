import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('rank') private readonly queue: Queue) {}

  async getHello(): Promise<string> {
    console.log('start!');
    await this.queue.add('Job', ['image1', 'image2']);
    console.log('Queue added!');
    return 'Hello World!';
  }
}
