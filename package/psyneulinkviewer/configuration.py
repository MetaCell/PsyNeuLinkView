graphviz = "graphviz"
psyneulink = "psyneulink"
conda_required_version = "4.9.1"

releases_url = 'https://api.github.com/repos/MetaCell/PsyNeuLinkView/releases'
application_url = "psyneulinkviewer-linux-x64/psyneulinkviewer"
symlink = "/usr/local/bin/psyneulinkviewer"
extract_location = "/usr/local/bin"

linux_conda_bash = "https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh"
mac_conda_bash = "https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh"

env_name = "psyneulinkview"
chmod_conda = "chmod +x ~/miniconda3/bin/conda"
create_env = "~/miniconda3/bin/conda create --name " + env_name + " python=3.11"
activate_env = "conda activate " + env_name
continue_on_conda = "~/miniconda3/bin/conda run -n " + env_name + " --verbose --no-capture-output --live-stream python -c 'from psyneulinkviewer.start import continue_on_conda; continue_on_conda()'"

rosetta_installation = "softwareupdate --install-rosetta --agree-to-license"

conda_forge = "conda config --add channels conda-forge"
node_installation = "conda install nodejs"
node_required_version = "4.19.0"
