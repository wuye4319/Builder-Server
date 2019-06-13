import { Service } from 'egg';

/**
 * Test Service
 */
export default class Product extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHello(name: string) {
    return `hello, ${name}`;
  }
}
