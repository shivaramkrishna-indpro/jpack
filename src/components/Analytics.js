'use client';

export default function Analytics({ data }) {
  const {
    originalSize,
    formattedSize,
    compressionRatio,
    reduction,
    originalLines,
    formattedLines,
    format
  } = data;

  const getFormatInfo = (formatType) => {
    const formats = {
      'schema': { name: 'JPack Schema', icon: '🧬', color: 'blue' },
      'delta': { name: 'JPack Delta', icon: '📊', color: 'green' },
      'binary': { name: 'JPack Binary', icon: '⚡', color: 'purple' }
    };
    return formats[formatType] || { name: 'JPack Format', icon: '🏛️', color: 'gray' };
  };

  const formatInfo = getFormatInfo(format);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Compression Analytics
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          JPack Schema compression results and size comparison
        </p>
      </div>

      {/* Main Comparison Table */}
      <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-600 mb-6">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Metric</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Original</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Compressed</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Saved</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-600">
            <tr className="hover:bg-gray-25 dark:hover:bg-gray-700/30">
              <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">File Size</td>
              <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400">{formatBytes(originalSize)}</td>
              <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400">{formatBytes(formattedSize)}</td>
              <td className="px-4 py-3 text-center">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  parseFloat(compressionRatio) > 0 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {parseFloat(compressionRatio) > 0 ? '-' : '+'}{Math.abs(parseFloat(compressionRatio))}%
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-25 dark:hover:bg-gray-700/30">
              <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">Characters</td>
              <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400">{originalSize.toLocaleString()}</td>
              <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400">{formattedSize.toLocaleString()}</td>
              <td className="px-4 py-3 text-center">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  reduction > 0 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {reduction > 0 ? '-' : '+'}{Math.abs(reduction).toLocaleString()}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
            {Math.abs(parseFloat(compressionRatio))}%
          </div>
          <div className="text-xs text-green-600 dark:text-green-500 font-medium">
            Size Reduction
          </div>
        </div>

        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {formatBytes(Math.abs(reduction))}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-500 font-medium">
            Bytes Saved
          </div>
        </div>

        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-md border border-purple-200 dark:border-purple-800">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
            {formatBytes(formattedSize)}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-500 font-medium">
            Final Size
          </div>
        </div>

        <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-md border border-emerald-200 dark:border-emerald-800">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            Schema
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-500 font-medium">
            Format Applied
          </div>
        </div>
      </div>
    </div>
  );
}