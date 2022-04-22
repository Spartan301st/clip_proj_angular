import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  isRunning = false;
  isReady = false;
  private ffmpeg;
  constructor() {
    this.ffmpeg = createFFmpeg({ log: true });
  }

  async init() {
    if (this.isReady) {
      return;
    }

    await this.ffmpeg.load();

    this.isReady = true;
  }

  async getScreenshots(file: File) {
    this.isRunning = true;
    const data = await fetchFile(file);
    this.ffmpeg.FS('writeFile', file.name, data);

    // for generating multiple screenshots
    const seconds = [1, 2, 3];
    const commands: string[] = [];

    seconds.forEach((second) => {
      commands.push(
        // INPUT (indicating the input file name)
        '-i',
        file.name,

        // OUTPUT OPTIONS (indicating the timestamp from which the screenshot should be grabbed - format: 'hh:mm:ss', number of frames to be captured on the given timestamp, resize the image before saving - not to be client screen dependent(-1 for retaining the aspect ratio))
        //
        '-ss',
        `00:00:0${second}`,
        //
        '-frames:v',
        '1',
        //
        '-filter:v',
        'scale=510:-1',
        // OUTPUT (indicating the output file name)
        `output_0${second}.png`
      );
    });

    await this.ffmpeg.run(...commands);

    const screenshots: string[] = [];

    seconds.forEach((second) => {
      // grabbing the img file from the separate storage
      const screenshotFile = this.ffmpeg.FS(
        'readFile',
        `output_0${second}.png`
      );

      // converting a binary data to a blob for rendering later
      const screenshotBlob = new Blob([screenshotFile.buffer], {
        type: 'image/png',
      });

      // creating a url out of a blob
      const screenshotURL = URL.createObjectURL(screenshotBlob);

      screenshots.push(screenshotURL);
    });

    this.isRunning = false;

    return screenshots;

    // // for running ffmpeg tool
    // await this.ffmpeg.run(
    //   // INPUT (indicating the input file name)
    //   '-i',
    //   file.name,

    //   // OUTPUT OPTIONS (indicating the timestamp from which the screenshot should be grabbed - format: 'hh:mm:ss', number of frames to be captured on the given timestamp, resize the image before saving - not to be client screen dependent(-1 for retaining the aspect ratio))
    //   //
    //   '-ss',
    //   '00:00:01',
    //   //
    //   '-frames:v',
    //   '1',
    //   //
    //   '-filter:v',
    //   'scale=510:-1',
    //   // OUTPUT (indicating the output file name)
    //   'output_01.png'
    // );
  }

  async blobFromURL(url: string) {
    const response = await fetch(url);
    const blob = await response.blob();

    return blob;
  }
}
