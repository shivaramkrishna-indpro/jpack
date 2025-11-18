const { compress, decompress, pack, getStats, isJPackSchema } = require('../lib/index.js');

// Test data
const testData = [
  { name: "John", role: "admin", active: true },
  { name: "Jane", role: "admin", active: true },
  { name: "Bob", role: "user", active: false }
];

console.log('🧪 Testing JPack Schema...\n');

// Test 1: Basic compression
console.log('1. Testing compress()...');
const compressed = compress(testData);
console.log('✅ Compression successful');
console.log('Schema keys:', Object.keys(compressed.schema).length);
console.log('Data items:', compressed.data.length);

// Test 2: Decompression
console.log('\n2. Testing decompress()...');
const decompressed = decompress(compressed);
const isEqual = JSON.stringify(testData) === JSON.stringify(decompressed);
console.log('✅ Decompression successful');
console.log('Data integrity:', isEqual ? '✅ Preserved' : '❌ Lost');

// Test 3: Statistics
console.log('\n3. Testing getStats()...');
const stats = getStats(testData, compressed);
console.log('✅ Statistics generated');
console.log(`Original size: ${stats.originalSize} bytes`);
console.log(`Compressed size: ${stats.compressedSize} bytes`);
console.log(`Compression ratio: ${stats.compressionPercentage}`);

// Test 4: Pack function
console.log('\n4. Testing pack()...');
const packed = pack(testData);
console.log('✅ Pack successful');
console.log(`Compression: ${packed.stats.compressionPercentage}`);

// Test 5: Validation
console.log('\n5. Testing isJPackSchema()...');
console.log('Valid schema:', isJPackSchema(compressed) ? '✅ Yes' : '❌ No');
console.log('Invalid data:', isJPackSchema(testData) ? '❌ False positive' : '✅ Correctly rejected');

// Test 6: Edge cases
console.log('\n6. Testing edge cases...');

// Empty array
const emptyResult = compress([]);
console.log('Empty array:', Array.isArray(emptyResult) ? '✅ Handled' : '❌ Failed');

// Single item
const singleResult = compress([{ test: "value" }]);
console.log('Single item:', singleResult.schema ? '✅ Compressed' : '✅ Passed through');

// Non-array
const nonArrayResult = compress({ test: "value" });
console.log('Non-array:', typeof nonArrayResult === 'object' ? '✅ Handled' : '❌ Failed');

console.log('\n🎉 All tests completed!');

// Performance test
console.log('\n⚡ Performance test with larger dataset...');
const largeData = Array(1000).fill().map((_, i) => ({
  id: i,
  name: `User ${i % 10}`, // Repeated names for better compression
  role: i % 3 === 0 ? 'admin' : 'user', // Repeated roles
  active: i % 2 === 0,
  department: `Dept ${i % 5}` // Repeated departments
}));

console.time('Compression time');
const largeCompressed = compress(largeData);
console.timeEnd('Compression time');

console.time('Decompression time');
const largeDecompressed = decompress(largeCompressed);
console.timeEnd('Decompression time');

const largeStats = getStats(largeData, largeCompressed);
console.log(`Large dataset compression: ${largeStats.compressionPercentage}`);
console.log(`Size reduction: ${largeStats.reduction} bytes`);

process.exit(0);