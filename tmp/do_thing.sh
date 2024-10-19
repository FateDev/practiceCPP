NAME=$1
RENAMED=$2
git checkout master
# rm -rf "tmp/$2"
git clone "git@github.com:aliabbas299792/$NAME.git" "tmp/$2"
git remote add "$2" "tmp/$2/"
git fetch "$2"
git branch -D "$2"
git checkout -b "$2" "$2/master"
mkdir "$2"
mv * "$2"
mv .gitignore "$2"
mv "$2/tmp" .
git add .
git reset tmp
git commit -m "moved project to a subdirectory"
git checkout master
git merge "$2" -m "adding $2 project" --allow-unrelated-histories
