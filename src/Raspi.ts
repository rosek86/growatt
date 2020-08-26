import { exec } from 'child_process';

export class Raspi {
  public static async getTemperature() {
    return new Promise<number>((resolve, reject) => {
      exec(`cat /sys/class/thermal/thermal_zone0/temp`, (err, stdout) => {
        if (err) {
          reject(err);
        } else {
          const temperature = parseInt(stdout, 10);
          resolve(temperature / 1000);
        }
      });
    });
  }
}
