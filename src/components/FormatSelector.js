'use client';

export default function FormatSelector() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        About JPack Schema Format
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
            How it works
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
            JPack Schema creates a dictionary of unique values and replaces duplicates with numeric references. This maintains full JSON compatibility while achieving 40-70% compression.
          </p>
          
          <div className="space-y-4">
            <div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Original JSON:</div>
              <pre className="text-xs bg-gray-50 dark:bg-gray-900 p-3 rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
{`[
  {"name": "John", "role": "admin"},
  {"name": "Jane", "role": "admin"},
  {"name": "Bob", "role": "user"}
]`}
              </pre>
            </div>
            
            <div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">JPack Schema:</div>
              <pre className="text-xs bg-gray-50 dark:bg-gray-900 p-3 rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
{`{
  "schema": {
    "0": "John", "1": "admin", 
    "2": "Jane", "3": "user", "4": "Bob"
  },
  "data": [
    {"name": 0, "role": 1},
    {"name": 2, "role": 1},
    {"name": 4, "role": 3}
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
            Key benefits
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">JSON Compatible</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Output remains valid JSON for easy processing</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">High Compression</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">40-70% size reduction through deduplication</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 shrink-0"></div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">Easy Operations</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Simple to query and manipulate data</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0"></div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">Reversible</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Convert back to original format easily</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              Best for:
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>• Arrays with repeated values</div>
              <div>• User lists and product catalogs</div>
              <div>• API responses with common fields</div>
              <div>• Configuration data with duplicates</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}