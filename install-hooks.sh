#!/bin/bash

# Crée le répertoire .git/hooks s'il n'existe pas
mkdir -p .git/hooks

# Copie le hook pre-commit dans le répertoire des hooks Git
cat << 'EOF' > .git/hooks/pre-commit
#!/bin/sh

# Vérification du lint avant le commit.
echo "Running ESLint..."

# Récupérer la liste des fichiers TypeScript/TSX ajoutés/modifiés en staging
FILES=$(git diff --cached --name-only --diff-filter=AM | grep -E '\.(tsx|ts)$' || true)

if [ -z "$FILES" ]; then
  echo "No TypeScript or TSX files to lint. Skipping lint check."
  exit 0
fi

# Vérifier ESLint
npx eslint --fix $FILES

# Vérifier le code de sortie d'ESLint
if [ $? -ne 0 ]; then
  echo "❌ ESLint found issues! Commit aborted."
  exit 1
fi

echo "✅ ESLint passed! Proceeding with commit."
EOF

# Rendre le fichier pre-commit exécutable
chmod +x .git/hooks/pre-commit

# Confirmation de l'installation
echo "Git pre-commit hook installed successfully!"
