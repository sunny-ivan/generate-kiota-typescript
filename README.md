# generate-kiota-typescript

Unofficial automatic generator for kiota-typescript

Generate by https://github.com/microsoft/kiota (MIT license)

## Features

- Allow custom URI to OpenAPI description file
- Check for updates and write them to the data directory in your repository.
- Generate typescript source code of the Kiota client if there are updates.
- Install dependencies and build it.
- Suggest a version if this build is different from the last.
- Push source code and data files to the repository

## Tutorial

**Step 1. Create necessary files.**

Create `package.json` with `npm init`

Create `tsconfig.json` with the following contents

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationDir": "./dist",
    "outDir": "./dist",
    "sourceMap": true,
    "removeComments": false
  },
  "include": ["src/**/*"]
}
```

Create `.npmignore` with the following contents

```
.github
data
.*
```

**Step 2. Use the action in your automatic GitHub Action jobs.**

```yaml
- name: Generate Kiota client
  id: generate
  uses: sunny-ivan/generate-kiota-typescript@v1 # Use the latest version if available
  with:
    kiota_generate_options: --class-name CustomClient --include-path **/foo/** --include-path **/bar/**
```

**Step 3. Add other steps to your GitHub Action jobs.**

Tagging, releasing, publishing and sending notification
