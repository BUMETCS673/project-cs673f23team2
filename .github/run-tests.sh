#!/bin/sh

# Create a copy of test files and backend files in a tmp directory
mkdir tmp;
cp -r code/backend/tests/*.py tmp;
cp -r code/backend/helpers/*.py tmp;
cp -r code/backend/*.py tmp;

# copy the requirements file
cp code/backend/requirements.txt tmp;

# move into tmp folder
cd tmp;

# install requirements
pip3 install -r requirements.txt;

# run the test cases
test_files=$(ls -d -- test_*.py )
echo "++++++++++++++++++++++++++++++++++++++++" $test_files
for file in $test_files
do
    python3 $file;
done

# delete tmp directory
cd ..;
rm -rf tmp;