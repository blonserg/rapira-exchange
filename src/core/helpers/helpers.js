// Makes requests to Rapira API
export async function makeApiRequest(path) {
  try {
    const response = await fetch(`https://api.goxx.ru/${path}`);
    return response.json();
  } catch(error) {
    throw new Error(`Rapira request error: ${error.status}`);
  }
}

// Generates a symbol ID from a pair of the coins
export function generateSymbol(fromSymbol, toSymbol) {
  const short = `${fromSymbol}/${toSymbol}`;
  return {
    short,
    full: `${short}`,
  };
}

// Returns all parts of the symbol
export function parseFullSymbol(fullSymbol) {
  const match = fullSymbol.match(/(\w+)\/(\w+)$/);
  if (!match) {
    return null;
  }
  return {  fromSymbol: match[1], toSymbol: match[2] };
}

// Returns all parts of the symbol
export function parseSymbolStream(fullSymbol) {
  const match = fullSymbol.match(/(\w+)\_(\w+)$/);
  if (!match) {
    return null;
  }
  return {  fromSymbol: match[1], toSymbol: match[2] };
}

// Makes digits to easy to view
export function formatNumbers(number, digitSeparator = ' ', fractionalSeparator = '.', isShorten = false, decimalPlaces = 6) {
  const shortenSuffixes = ['K', 'M', 'B', 'T', 'Q'];
  const decimalMultiplier = 10 ** decimalPlaces;

  if (number === 0) {
    return '0.00';
  }

  if (isShorten) {
    let exponent = Math.floor(Math.log10(Math.abs(number)) / 3);
    if (exponent < 0) exponent = 0;

    const rounded = Math.round(number / (1000 ** exponent) * decimalMultiplier) / decimalMultiplier;
    let formattedNumber = rounded.toFixed(decimalPlaces);

    if (formattedNumber.endsWith('.00')) {
      formattedNumber = formattedNumber.slice(0, -3);
    }

    return `${formattedNumber}${shortenSuffixes[exponent - 1] || ''}`;
  } else {
    const [integerPart, fractionalPart] = number.toFixed(decimalPlaces).split('.');

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, digitSeparator);
    // const formattedFractional = fractionalPart || '00';
    const formattedFractional = fractionalPart ? fractionalPart.replace(/0+$/, '') : '00';
    if (!formattedFractional) {
      fractionalSeparator = ""
    }

    return `${formattedInteger}${fractionalSeparator}${formattedFractional}`;
  }
}

