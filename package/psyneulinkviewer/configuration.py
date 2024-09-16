graphviz = "graphviz"
psyneulink = "psyneulink"
conda_required_version = "4.9.1"

releases_url = 'https://api.github.com/repos/MetaCell/PsyNeuLinkView/releases'
application_url = "psyneulinkviewer-linux-x64/psyneulinkviewer"
application_url_mac = "psyneulinkviewer-darwin-x64/psyneulinkviewer.app"


#Symlink
symlink = "/usr/local/bin/psyneulinkviewer"
extract_location = "/usr/local/bin"

linux_conda_bash = "https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh"
mac_conda_bash = "https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh"

env_name = "psyneulinkview"

conda_installation_path = "~/miniconda3"
conda_installation_path_mac_default = "/opt/miniconda3"

conda_binary = "~/miniconda3/bin/conda"
conda_binary_mac_default = "/opt/miniconda3/bin/conda"

create_env = "/bin/conda create --name " + env_name + " python=3.11"

binary_commands = " --verbose --no-capture-output --live-stream python -c 'from psyneulinkviewer.start import continue_on_conda; continue_on_conda()'"
continue_on_conda_new_env = "/bin/conda run -n " + env_name + binary_commands

rosetta_installation = "softwareupdate --install-rosetta --agree-to-license"

conda_forge = "conda config --add channels conda-forge"
node_installation = "conda install nodejs"
node_required_version = "4.19.0"
