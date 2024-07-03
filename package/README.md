# PsyNeuLinkView Package

To build pip package
```
cd package
python3 -m build
```

To pip install package created in previous step
```
python3 -m pip install --no-index --find-links=package_directory_path + "/dist" psyneulinkview
```

To run psyneulinkviewer
```
/usr/local/bin/psyneulinkviewer
```

or 

```
psyneulinkviewer
```