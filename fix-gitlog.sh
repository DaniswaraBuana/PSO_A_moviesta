#!/bin/bash

# Script untuk memperbaiki commit messages
# WARNING: Ini akan rewrite git history!

echo "⚠️  WARNING: This will rewrite git history!"
echo "Make sure you have backup or already pushed to remote"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

# Backup current branch
git branch backup-before-rewrite

echo "✅ Created backup branch: backup-before-rewrite"
echo "📝 Rewriting commit messages..."

# Rewrite commits using filter-branch
git filter-branch -f --msg-filter '
  case "$GIT_COMMIT" in
    61254a7*) echo "ci: update CI/CD workflow configuration";;
    d11e7da*) echo "feat(celebrity): add celebrity feature to application";;
    7740d5c*) echo "test(cypress): update celebrity E2E test selectors";;
    fde6ed7*) echo "fix(celebrity): resolve test failures and middleware issues";;
    938f838*) echo "fix(navbar): resolve React hydration mismatch error";;
    51c9adc*) echo "test: rename test files with numeric prefixes for ordering";;
    cd5dae2*) echo "feat(celebrity): update celebrity UI styling and components";;
    3cf7489*) echo "feat(celebrity): implement celebrity tabs, cards and navigation";;
    *) cat;;
  esac
' HEAD~8..HEAD

echo "✅ Commit messages rewritten!"
echo ""
echo "📋 New git log:"
git log --oneline -10
echo ""
echo "To push changes:"
echo "  git push --force-with-lease origin main"
echo ""
echo "To revert (if something wrong):"
echo "  git reset --hard backup-before-rewrite"
