import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public d3 = d3;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  /**
   * Generates random letter string with specified length
   * @param length: number
   */
  public generateId(length): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
