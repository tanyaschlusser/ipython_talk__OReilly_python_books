O'Reilly Python possibilities lightning talk
============================================


How to view this online
-----------------------

<a href="http://nbviewer.ipython.org/github/tanyaschlusser/ipython_talk__OReilly_python_books/blob/master/OReilly_python_books.ipynb">Click here</a>

How to install
--------------

You need iGraph, which relies on a C library that must be compiled.
Images are available <a href="https://pypi.python.org/pypi/python-igraph">here</a>.

Run this in a virtual environment to temporarily
load the dependencies without having to make them
a permanent addition to your libraries:

  1. install virtualenv, which allows running a virtual Python environment
  2. enter the virtual environment and install dependencies
      a. Need the Python dependencies
      b. For natural language toolkit (nltk) download 'stopwords' from the corpora
  3. exit the virtual environment

Commands:

    # Deal with installing the iGraph C libraries however you choose
    pip install virtualenv
    virtualenv venv  # Create a directory to hold your virtual environment
    source venv/bin/activate  # Add the venv path to your path
    pip install -r requirements.txt  # Install the requirements in the venv
    python -c "import nltk; nltk.download()"  # a gui: get nltk.corpus.stopwords
    deactivate  # Remove the venv path from your path


How to run
----------

The resources need only be installed in the virtual environment once.
Then:

    source venv/bin/activate
    ipython notebook

To stop ipython, go to the main console (http://127.0.0.1:8888/)
and click the 'Shutdown' button next to your running notebook.
Then type control-c in the console running ipython, and
confirm with a 'y' that you actually want to stop.
