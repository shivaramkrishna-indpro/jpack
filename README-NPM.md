# JPack Schema

[![npm version](https://badge.fury.io/js/jpack-schema.svg)](https://badge.fury.io/js/jpack-schema)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Smart JSON compression using schema-based value deduplication. Achieve **40-70% size reduction** while maintaining full JSON compatibility.

## 🚀 Features

- **High Compression**: 40-70% size reduction through value deduplication
- **JSON Compatible**: Output remains valid JSON for easy processing
- **Easy to Use**: Simple API with compress/decompress functions
- **TypeScript Support**: Full type definitions included
- **Zero Dependencies**: Lightweight and fast
- **Reversible**: Easy conversion back to original format

## 📦 Installation

```bash
npm install jpack-schema
```

## 🔧 Usage

### Basic Compression

```javascript
const { compress, decompress } = require('jpack-schema');

// Original data
const data = [
  { name: "John", role: "admin", active: true },
  { name: "Jane", role: "admin", active: true },
  { name: "Bob", role: "user", active: false }
];

// Compress
const compressed = compress(data);
console.log(compressed);
// {
//   schema: { "0": "John", "1": "admin", "2": true, "3": "Jane", "4": "user", "5": "Bob", "6": false },
//   data: [
//     { name: 0, role: 1, active: 2 },
//     { name: 3, role: 1, active: 2 },
//     { name: 5, role: 4, active: 6 }
//   ]
// }

// Decompress
const original = decompress(compressed);
console.log(original); // Back to original format
```

### With Statistics

```javascript
const { pack, getStats } = require('jpack-schema');

const data = [/* your data */];

// Get compression result with stats
const result = pack(data);
console.log(result.compressed); // Compressed data
console.log(result.stats);      // Compression statistics
```

### Statistics Output

```javascript
{
  originalSize: 150,
  compressedSize: 95,
  reduction: 55,
  compressionRatio: 36.7,
  compressionPercentage: "36.7%"
}
```

## 📚 API Reference

### `compress(data)`
Compresses JSON data using JPack Schema format.
- **Parameters**: `data` - The JSON data to compress
- **Returns**: Compressed object with `schema` and `data` properties

### `decompress(compressedData)`
Decompresses JPack Schema format back to original JSON.
- **Parameters**: `compressedData` - The compressed data object
- **Returns**: Original JSON data

### `pack(data)`
All-in-one function that compresses data and returns result with statistics.
- **Parameters**: `data` - The JSON data to compress
- **Returns**: Object with `compressed`, `stats`, and `original` properties

### `getStats(original, compressed)`
Calculates compression statistics.
- **Parameters**: 
  - `original` - Original data
  - `compressed` - Compressed data
- **Returns**: Statistics object

### `isJPackSchema(data)`
Validates if data is in JPack Schema format.
- **Parameters**: `data` - Data to validate
- **Returns**: Boolean indicating if data is valid JPack Schema

## 💡 When to Use

JPack Schema is perfect for:

- **API responses** with duplicate metadata
- **User lists** with repeated roles/statuses
- **Product catalogs** with common attributes
- **Configuration files** with shared settings
- **Any JSON data** with repetitive values

## 🎯 Best Results

You'll see the highest compression ratios with:
- Arrays of objects with repeated values
- JSON with common field values across records
- Data with duplicate strings, numbers, or booleans
- Structured data like user lists, product catalogs, etc.

## 🌐 Web Interface

Try the interactive web interface at: [https://jpack.vercel.app/](https://jpack.vercel.app/)

## 📄 License

MIT © [shivaramkrishna-indpro](https://github.com/shivaramkrishna-indpro)

## 🤝 Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/shivaramkrishna-indpro/jpack).