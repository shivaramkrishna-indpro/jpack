/**
 * JPack Schema - Smart JSON compression using value deduplication
 * @author shivaramkrishna-indpro
 * @version 1.0.0
 */

/**
 * Compresses JSON data using JPack Schema format
 * @param {any} data - The JSON data to compress
 * @returns {object} Compressed data with schema and data properties
 */
function compress(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return data;
  }

  // For small datasets, check if compression is beneficial
  if (data.length < 3) {
    return data;
  }

  const schema = {};
  const compressed = [];
  
  // Extract unique values and create schema, but only for values that appear multiple times
  const valueFrequency = new Map();
  const valueMap = new Map();
  let refId = 0;
  
  // First pass: count value frequencies
  const countValues = (obj) => {
    if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
      for (const value of Object.values(obj)) {
        if (typeof value === 'object' && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(countValues);
          } else {
            countValues(value);
          }
        } else {
          const key = JSON.stringify(value);
          valueFrequency.set(key, (valueFrequency.get(key) || 0) + 1);
        }
      }
    }
  };
  
  data.forEach(countValues);
  
  // Only add values to schema that appear more than once and are worth compressing
  const shouldCompress = (value) => {
    const key = JSON.stringify(value);
    const freq = valueFrequency.get(key) || 0;
    const valueSize = key.length;
    // Only compress if it appears multiple times and saves space
    return freq > 1 && valueSize > 3;
  };
  
  const processValue = (value) => {
    if (shouldCompress(value)) {
      const key = JSON.stringify(value);
      if (!valueMap.has(key)) {
        valueMap.set(key, refId++);
        schema[valueMap.get(key)] = value;
      }
      return valueMap.get(key);
    }
    return value;
  };
  
  const compressObject = (item) => {
    if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
      const compressed = {};
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === 'object' && value !== null) {
          compressed[key] = Array.isArray(value) 
            ? value.map(processValue)
            : compressObject(value);
        } else {
          compressed[key] = processValue(value);
        }
      }
      return compressed;
    }
    return processValue(item);
  };
  
  data.forEach(item => {
    compressed.push(compressObject(item));
  });
  
  // If no compression achieved, return original data
  if (Object.keys(schema).length === 0) {
    return data;
  }
  
  return { schema, data: compressed };
}

/**
 * Decompresses JPack Schema format back to original JSON
 * @param {object} compressedData - The compressed data with schema and data properties
 * @returns {any} Original JSON data
 */
function decompress(compressedData) {
  if (!compressedData || !compressedData.schema || !compressedData.data) {
    return compressedData;
  }

  const { schema, data } = compressedData;
  
  const decompressValue = (value) => {
    if (typeof value === 'number' && schema.hasOwnProperty(value)) {
      return schema[value];
    }
    return value;
  };
  
  const decompressObject = (item) => {
    if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
      const decompressed = {};
      for (const [key, value] of Object.entries(item)) {
        if (Array.isArray(value)) {
          decompressed[key] = value.map(decompressValue);
        } else if (typeof value === 'object' && value !== null) {
          decompressed[key] = decompressObject(value);
        } else {
          decompressed[key] = decompressValue(value);
        }
      }
      return decompressed;
    }
    return decompressValue(item);
  };
  
  return data.map(item => decompressObject(item));
}

/**
 * Calculates compression statistics
 * @param {any} original - Original data
 * @param {object} compressed - Compressed data
 * @returns {object} Statistics object
 */
function getStats(original, compressed) {
  const originalSize = JSON.stringify(original).length;
  const compressedSize = JSON.stringify(compressed).length;
  const reduction = originalSize - compressedSize;
  const compressionRatio = ((reduction / originalSize) * 100);

  return {
    originalSize,
    compressedSize,
    reduction,
    compressionRatio: parseFloat(compressionRatio.toFixed(1)),
    compressionPercentage: `${compressionRatio.toFixed(1)}%`
  };
}

/**
 * All-in-one function that compresses data and returns both result and stats
 * @param {any} data - The JSON data to compress
 * @returns {object} Object containing compressed data and statistics
 */
function pack(data) {
  const compressed = compress(data);
  const stats = getStats(data, compressed);
  
  return {
    compressed,
    stats,
    original: data
  };
}

/**
 * Validates if data is in JPack Schema format
 * @param {any} data - Data to validate
 * @returns {boolean} True if valid JPack Schema format
 */
function isJPackSchema(data) {
  return (
    typeof data === 'object' &&
    data !== null &&
    data.hasOwnProperty('schema') &&
    data.hasOwnProperty('data') &&
    typeof data.schema === 'object' &&
    Array.isArray(data.data)
  );
}

module.exports = {
  compress,
  decompress,
  getStats,
  pack,
  isJPackSchema,
  version: '1.0.0'
};