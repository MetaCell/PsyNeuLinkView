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

# PsyNeuLinkView Installing from Linux

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

# PsyNeuLinkView Installing from MacOS

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


# Testing Models

If all went well with installation, you should see the application running as in screenshot below :
![image](https://github.com/user-attachments/assets/ec84044c-287a-4e39-bdf7-aa27cdc486f9)

To test models, download [these models](https://github.com/MetaCell/PsyNeuLinkView/tree/feature/PSYNEU-140/test_models) and import one at a time to test. Each time a Model is open, the previous one will disappear. I recommend you start with the models inside 'working_tests', as those are the ones we know for sure should we working.

To import go to File -> Open Models 
