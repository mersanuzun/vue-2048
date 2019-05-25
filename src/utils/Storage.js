export default class Storage {
  static set(key, value) {
    const valueAsJson = {
      value,
    };

    localStorage.setItem(key, JSON.stringify(valueAsJson));
  }

  static get(key) {
    const value = localStorage.getItem(key) || '{}';

    return JSON.parse(value).value;
  }
}
