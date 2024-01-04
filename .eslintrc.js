module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "prettier"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        "react/no-unknown-property": ['error', { ignore: ['css', "args", 'position', 'angle', 'penumbra', 'castShadow',
                        "shadow-mapSize-width", "shadow-mapSize-height", 'intensity', 'dispose', 'rotation', 'object',
                        'frustumCulled', 'geometry', 'material', 'skeleton'] }],
    }
}
