class StringValidator {
  static isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isLength(str: string, min: number, max: number): boolean {
    return str.length >= min && str.length <= max;
  }

  static isNoForbiddenSymbols(str: string, symbols: string): boolean {
    for (let i = 0; i < symbols.length; i++) {
      if (str.includes(symbols[i])) {
        return false;
      }
    }

    return true;
  }
}

export default StringValidator;
