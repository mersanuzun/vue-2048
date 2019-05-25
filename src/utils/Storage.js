class Storage {
  set(key, value) {
    const valueAsJson = { value };

    localStorage.setItem(key, JSON.stringify(valueAsJson));
  }

  get(key) {
    const value = localStorage.getItem(key) || '{}';
    
    return JSON.parse(value).value;
  }
}

export default new Storage();