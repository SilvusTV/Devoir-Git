module.exports = {
  parser: "@typescript-eslint/parser", // Utilise le parser TypeScript
  parserOptions: {
    ecmaVersion: 2020, // Utilise les fonctionnalités ECMAScript modernes
    sourceType: "module", // Permet les imports ES6
    ecmaFeatures: {
      jsx: true, // Permet l'analyse des fichiers JSX
    },
  },
  extends: [
    "eslint:recommended", // Utilise les règles recommandées par ESLint
    "plugin:react/recommended", // Utilise les règles recommandées par eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Utilise les règles recommandées par @typescript-eslint
    "plugin:react-hooks/recommended", // Ajoute des règles spécifiques aux hooks React
    "plugin:prettier/recommended", // Intègre Prettier pour formater le code
  ],
  rules: {
    "react/prop-types": "off", // Désactive la règle des PropTypes (non nécessaire en TypeScript)
    "react/react-in-jsx-scope": "off", // Désactive la vérification du scope de React (non nécessaire depuis React 17)
    "@typescript-eslint/explicit-module-boundary-types": "off", // Désactive la règle des types de retour explicites dans les modules
    "no-unused-vars": "warn", // Avertissement pour les variables non utilisées
    "@typescript-eslint/no-unused-vars": ["warn"], // Avertissement pour les variables non utilisées en TypeScript
    "react/jsx-uses-react": "off", // Désactive la règle d'utilisation de React dans JSX (non nécessaire depuis React 17)
    "react/jsx-uses-vars": "error", // Vérifie que les variables JSX sont utilisées correctement
    "react-hooks/rules-of-hooks": "error", // Assure que les hooks sont appelés dans un contexte valide
    "react-hooks/exhaustive-deps": "warn", // Avertissement si les dépendances des hooks sont manquantes
  },
  settings: {
    react: {
      version: "detect", // Détecte automatiquement la version de React
    },
  },
  env: {
    browser: true, // Définit l'environnement comme étant le navigateur
    node: true, // Définit l'environnement comme étant Node.js
    es2020: true, // Permet l'utilisation des fonctionnalités ECMAScript 2020
  },
};
