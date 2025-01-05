#!/bin/bash

# Crée le répertoire .git/hooks s'il n'existe pas
mkdir -p .git/hooks

# Copie le hook pre-commit dans le répertoire des hooks Git
cat << 'EOF' > .git/hooks/pre-commit
#!/bin/sh

# Vérification du lint avant le commit
echo "Running ESLint..."

# Exécuter ESLint sur les fichiers modifiés
FILES=$(git diff --cached --name-only --diff-filter=AM | grep '\.tsx\?$')
if [ -z "$FILES" ]; then
  echo "No TypeScript or JSX files to lint. Skipping lint check."
  exit 0
fi

# Lancer ESLint sur les fichiers modifiés
npx eslint $FILES

# Si ESLint trouve des erreurs, annuler le commit
if [ $? -ne 0 ]; then
  echo "Linting failed! Commit aborted."
  exit 1
fi

echo "Linting passed! Proceeding with commit."
EOF

# Rendre le fichier pre-commit exécutable
chmod +x .git/hooks/pre-commit

# Confirmation de l'installation
echo "Git pre-commit hook installed successfully!"
