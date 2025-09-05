class Config {
  // Helper methods

  static get(key, defaultValue = null) {
    return process.env[key] || defaultValue;
  }

  static getNumber(key, defaultValue = 0) {
    const value = process.env[key];
    return value ? parseInt(value) : defaultValue;
  }

  static getRequired(key) {
    const value = process.env[key];

    if (!value) throw new Error(`Environment variable ${key} is required.`);
    return value;
  }
}
