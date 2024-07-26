graphviz = "graphviz"
psyneulink = "psyneulink"
conda_required_version = "4.9.1"

releases_url = 'https://api.github.com/repos/MetaCell/PsyNeuLinkView/releases'
application_url = "psyneulinkviewer-linux-x64/psyneulinkviewer"
symlink = "/usr/local/bin/psyneulinkviewer"
extract_location = "/usr/local/bin"

linux_conda_bash = "https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh"
mac_conda_bash = "https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh"

env_name = "psyneulinkviewer"
create_env = "conda create --name " + env_name
activate_env = "conda activate " + env_name

rosetta_installation = "softwareupdate --install-rosetta --agree-to-license"

conda_forge = "conda config --add channels conda-forge"
node_installation = "conda install nodejs"
node_required_version = "4.19.0"
