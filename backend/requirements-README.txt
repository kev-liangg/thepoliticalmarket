READ ME!

to add new requirements to the environment, follow these steps:

1. if backend/localvenv is not present, run 'python3 -m venv localvenv'
2. run 'source localvenv/bin/activate'
3. run 'pip install -r requirements.txt'
4. install the new package with 'pip install ...'
5. run 'pip freeze > requirements.txt'
6. ensure the new 'requirements.txt' is committed and pushed.
7. when finished with local development, run 'deactivate'

The last step is especially important if you do any other Python work!
This will stop 'requirements.txt' from getting any unintended packages.