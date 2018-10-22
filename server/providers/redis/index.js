/**
 * Mock de una instancia de Redis para cachear successful API responses
 *
 * Obviamente esto nunca debe hacerse en producción!
 *
 * @class FakeRedis
 */
class FakeRedis {
  constructor() {
    this.store = {};
    this.timers = {};
    this.ttl = 60 * 1000; // time to live in ms for store objects
  }

  async get(key, cb, defaults) {
    if (!this.store[key] && typeof cb === "function")
      await this.set(key, await cb());

    return Promise.resolve(this.store[key] || defaults);
  }

  async set(key, value, ttl = this.ttl) {
    this.store[key] = value;
    this.timers[key] = setTimeout(() => {
      delete this.store[key];
      clearTimeout(this.timers[key]);
    }, ttl);

    return Promise.resolve(value);
  }
}

module.exports = new FakeRedis();
