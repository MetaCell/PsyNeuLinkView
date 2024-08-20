# PsyNeuLinkView Package Building

To build pip package
```
cd package
python3 -m build
```

To test local build
```
pip install dist/psyneulinkviewer-VERSIOn.tar.gz
```

To upload to distribution server. You will need token shared privately to be able to upload. 
```
python3 -m twine upload dist/*
```

To upload to test Pypi server
```
python3 -m twine upload --repository testpypi dist/*
```

# PsyNeuLinkView Installing from PyPI Linux

To install from PyPi
```
sudo pip install psyneulinkviewer
```

Re-read bash profile after conda installation
```
source ~/.bash_profile 
```

Activate psyneulinkview
```
conda activate psyneulinkview
```

To run psyneulinkviewer
```
psyneulinkviewer
```

# PsyNeuLinkView Installing from PyPI MacOS

To install from PyPi
```
sudo pip install psyneulinkviewer
```

Re-read bash profile after conda installation
```
source ~/.bash_profile 
```

Activate psyneulinkview
```
conda activate psyneulinkview
```

Activate psyneulinkview
```
open /usr/local/bin/psyneulinkviewer-darwin-x64/psyneulinkviewer.app
```

