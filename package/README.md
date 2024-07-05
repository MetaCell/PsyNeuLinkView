# PsyNeuLinkView Package Building

To build pip package
```
cd package
python3 -m build
```

To upload to distribution server
```
twine upload dist/*
```

To pip install local package created in previous steps
```
python3 -m pip install --no-index --find-links=package_directory_path + "/dist" psyneulinkview
```

# PsyNeuLinkView Installing from PyPI

To install from PyPi
```
pip install psyneulinkview --extra-index-url https://pypi.org/project/psyneulinkview
```

To run psyneulinkviewer
```
psyneulinkviewer
```
