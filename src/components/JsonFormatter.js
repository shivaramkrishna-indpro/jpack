'use client';

import { useState, useCallback, useEffect } from 'react';
import Analytics from './Analytics';
import FormatSelector from './FormatSelector';

export default function JsonFormatter() {
  const [inputJson, setInputJson] = useState('');
  const [formattedOutput, setFormattedOutput] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [selectedFormat] = useState('schema');

  // JPack Schema: Extract schema and compress data using references
  const createJPackSchema = useCallback((obj) => {
    if (Array.isArray(obj) && obj.length > 0) {
      const schema = {};
      const compressed = [];
      
      // Extract unique values and create schema
      const valueMap = new Map();
      let refId = 0;
      
      const processValue = (value) => {
        const key = JSON.stringify(value);
        if (!valueMap.has(key)) {
          valueMap.set(key, refId++);
          schema[valueMap.get(key)] = value;
        }
        return valueMap.get(key);
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
      
      obj.forEach(item => {
        compressed.push(compressObject(item));
      });
      
      return { schema, data: compressed };
    }
    
    // For non-arrays, just return the object as is
    return obj;
  }, []);  const formatJson = useCallback(() => {
    if (!inputJson.trim()) {
      setError('');
      setFormattedOutput('');
      setAnalytics(null);
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      setError('');

      let processedData;
      let formatted;
      let compressedSize;
      
      // Always use JPack Schema format
      processedData = createJPackSchema(parsed);
      formatted = JSON.stringify(processedData, null, 2);
      compressedSize = JSON.stringify(processedData).length;

      const originalSize = inputJson.length;
      const compressionRatio = ((originalSize - compressedSize) / originalSize * 100);

      setFormattedOutput(formatted);
      setAnalytics({
        originalSize,
        formattedSize: compressedSize,
        compressionRatio: compressionRatio.toFixed(1),
        reduction: originalSize - compressedSize,
        originalLines: inputJson.split('\n').length,
        formattedLines: typeof formatted === 'string' ? formatted.split('\n').length : 1,
        format: 'schema'
      });
    } catch (err) {
      setError('Invalid JSON: ' + err.message);
      setFormattedOutput('');
      setAnalytics(null);
    }
  }, [inputJson, createJPackSchema]);

  // Handle file import
  const handleFileImport = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.json')) {
      setError('Please select a JSON file (.json extension)');
      return;
    }

    setIsLoading(true);
    setFileName(file.name);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        setInputJson(content);
        setIsLoading(false);
      } catch (err) {
        setError('Error reading file: ' + err.message);
        setIsLoading(false);
      }
    };
    
    reader.onerror = () => {
      setError('Error reading file');
      setIsLoading(false);
    };

    reader.readAsText(file);
  }, []);

  // Clear file input
  const clearInput = useCallback(() => {
    setInputJson('');
    setFileName('');
    setError('');
  }, []);

  // Auto-format when input changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      formatJson();
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timeoutId);
  }, [formatJson]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedOutput);
  };

  const downloadFile = () => {
    const blob = new Blob([formattedOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.schema.jpack';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Input JSON
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {inputJson.length.toLocaleString()} chars
              </span>
              <label className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isLoading}
                />
                <div className={`flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>{isLoading ? 'Loading...' : 'Import'}</span>
                </div>
              </label>
              
              {inputJson && (
                <button
                  onClick={clearInput}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>
          <textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder={isLoading ? "Loading file..." : "Paste your JSON data here or use the import button above..."}
            className={`w-full h-96 p-4 border border-gray-200 dark:border-gray-600 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              isLoading ? 'opacity-50 cursor-wait' : ''
            }`}
            disabled={isLoading}
          />
          {isLoading && (
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-md">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <p className="text-blue-700 dark:text-blue-400 text-sm font-medium">Processing file...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-md">
              <p className="text-red-700 dark:text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              JPack Schema Output
            </h2>
            <div className="flex space-x-3">
              <button
                onClick={copyToClipboard}
                disabled={!formattedOutput}
                className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
              <button
                onClick={downloadFile}
                disabled={!formattedOutput}
                className="flex items-center gap-2 px-3 py-2 bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download
              </button>
            </div>
          </div>
          <textarea
            value={formattedOutput}
            readOnly
            placeholder="Compressed JPack Schema output will appear here..."
            className="w-full h-96 p-4 border border-gray-200 dark:border-gray-600 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none"
          />
        </div>
      </div>

      {/* Analytics */}
      {analytics && <Analytics data={analytics} />}
      
      {/* Format Info */}
      <FormatSelector />
    </div>
  );
}