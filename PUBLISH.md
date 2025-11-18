# NPM Publishing Guide for JPack Schema

## 📦 Quick Publishing Steps

### 1. Prepare Package Files
```bash
# Copy npm-specific configuration
cp package-npm.json package.json.npm
cp README-NPM.md README.npm.md
```

### 2. Test the Package
```bash
npm test
```

### 3. Login to NPM
```bash
npm login
```
Enter your NPM credentials when prompted.

### 4. Prepare for Publishing
```bash
# Backup current files
mv package.json package.json.web
mv README.md README.web.md

# Use npm package files
mv package.json.npm package.json  
mv README.npm.md README.md
```

### 5. Publish
```bash
# Check what will be published
npm pack --dry-run

# Publish to NPM
npm publish
```

### 6. Restore Web App Files
```bash
# Restore original files
mv package.json package.json.npm
mv README.md README.npm.md
mv package.json.web package.json
mv README.web.md README.md
```

## 🎯 Package Details

- **Name**: `jpack-schema`
- **Version**: `1.0.0`
- **Size**: ~3KB (minified)
- **Dependencies**: Zero
- **License**: MIT

## 📋 What Gets Published

```
jpack-schema/
├── lib/
│   ├── index.js      # Main library
│   └── index.d.ts    # TypeScript definitions
├── test/
│   └── test.js       # Test suite
├── README.md         # Package documentation
├── LICENSE           # MIT license
└── package.json      # NPM configuration
```

## 🚀 After Publishing

Your package will be available at:
- **NPM**: https://www.npmjs.com/package/jpack-schema
- **Install**: `npm install jpack-schema`

## 🔄 Updates

For future updates:
1. Update version in `package-npm.json`
2. Run tests
3. Follow steps 4-6 above
4. Use `npm publish` for new versions