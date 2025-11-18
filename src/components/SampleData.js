'use client';

export default function SampleData({ onLoadSample }) {
  const samples = [
    {
      name: 'Simple Object',
      data: {
        "name": "John Doe",
        "age": 30,
        "city": "New York",
        "email": "john@example.com",
        "active": true
      }
    },
    {
      name: 'Similar Objects (Delta Optimized)',
      data: [
        {
          "id": 1,
          "name": "Alice Johnson",
          "email": "alice@company.com",
          "role": "admin",
          "department": "Engineering",
          "location": "New York",
          "permissions": ["read", "write", "delete"],
          "lastLogin": "2024-01-15T10:30:00Z",
          "active": true,
          "salary": 120000
        },
        {
          "id": 2,
          "name": "Bob Smith", 
          "email": "bob@company.com",
          "role": "admin",
          "department": "Engineering",
          "location": "New York",
          "permissions": ["read", "write", "delete"],
          "lastLogin": "2024-01-14T15:45:00Z",
          "active": true,
          "salary": 115000
        },
        {
          "id": 3,
          "name": "Carol Davis",
          "email": "carol@company.com", 
          "role": "admin",
          "department": "Engineering",
          "location": "New York",
          "permissions": ["read", "write", "delete"],
          "lastLogin": "2024-01-13T09:15:00Z",
          "active": true,
          "salary": 125000
        },
        {
          "id": 4,
          "name": "David Wilson",
          "email": "david@company.com",
          "role": "admin", 
          "department": "Engineering",
          "location": "New York",
          "permissions": ["read", "write", "delete"],
          "lastLogin": "2024-01-12T14:20:00Z",
          "active": true,
          "salary": 118000
        }
      ]
    },
    {
      name: 'Complex Nested',
      data: {
        "company": {
          "name": "TechCorp Inc.",
          "founded": 2020,
          "headquarters": {
            "address": {
              "street": "123 Innovation Drive",
              "city": "Silicon Valley",
              "state": "CA",
              "zipCode": "94000",
              "country": "USA"
            },
            "coordinates": {
              "latitude": 37.4419,
              "longitude": -122.1430
            }
          },
          "departments": [
            {
              "name": "Engineering",
              "budget": 2500000,
              "employees": [
                {"name": "Sarah Chen", "position": "Senior Developer", "salary": 120000},
                {"name": "Mike Wilson", "position": "DevOps Engineer", "salary": 110000}
              ]
            },
            {
              "name": "Marketing",
              "budget": 800000,
              "employees": [
                {"name": "Emma Davis", "position": "Marketing Manager", "salary": 95000}
              ]
            }
          ],
          "revenue": {
            "2023": 15000000,
            "2022": 12000000,
            "2021": 8000000
          }
        }
      }
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Sample Data
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Load sample data to see JPack Schema compression in action (40-70% reduction)
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            💡 <strong>Tip:</strong> Use the Import button below for large files
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {samples.map((sample, index) => (
          <button
            key={index}
            onClick={() => onLoadSample(JSON.stringify(sample.data, null, 2))}
            className="p-4 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200"
          >
            <div className="font-semibold text-gray-800 dark:text-white mb-2">
              {sample.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {Object.keys(sample.data).length} keys • {JSON.stringify(sample.data).length} chars
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}