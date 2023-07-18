# bosagora-boa-space-frontend

bosagora/boa-space-frontend

## My

- `Profile Settings` /mysettings

## Collection

- `list` /collection/list
- `Create` /collection/create

## Asset

- `Create` /assets/create
- `Detail` /assets/detail
- `List for sale` /assets/sellPub

# Setup

```
npx create-react-app . --template redux-typescript
yarn add @usedapp/core ethers
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion @metamask/jazzicon
yarn add @ethersproject/units
yarn add @apollo/client graphql
yarn add react-router-dom

yarn add eslint --dev
yarn run eslint --init
yarn add eslint-config-prettier eslint-plugin-prettier prettier --dev

.eslintrc
-------------------
"extends": [... , "plugin:prettier/recommended"]

.prettierrc
-------------------
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100
}

package.json
-------------------
-- scripts
"lint": "eslint .",
"lint:fix": "eslint --fix",
"format": "prettier --write './**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"

-- dependencies to change
"@types/react": "^17.0.38",
```
