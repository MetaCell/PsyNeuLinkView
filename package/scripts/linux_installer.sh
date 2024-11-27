#!/bin/bash

echo 'I AM SOURCING BASHRC'
source ~/.profile
echo $PATH

check_last_command () {
    if [[ $? -ne 0 ]]; then
        echo ">>> Please report the output below to support@metacell.us <<<"
        echo "Error: $1"
        python --version
        pip --version
        conda --version
        exit 1
    fi
}

# Variables
APP_NAME="PsyneulinkViewer"          # Name of the application
SYMLINK_PATH="psyneulinkviewer"      # Symlink to the application you want to launch
CONDA_ENV=$PSYNEULINK_ENV            # Conda environment to activate if none is active
ICON_PATH="/usr/local/bin/psyneulinkviewer-linux-x64/resources/app/build/logo.png"    # Path to the custom icon
DESKTOP_FILE="$HOME/Desktop/$APP_NAME.desktop"     # Path where the desktop shortcut will be created

rm -f "$DESKTOP_FILE"

# Cleanup existing installations of psneulinkviewer
rm -rf "/usr/local/bin/psyneulinkviewer-linux-x64/" 
rm -rf "/usr/local/bin/psyneulinkviewer" 
# Kill any existing rpc_server instances
ps aux | grep rpc_server | grep -v grep | awk '{print $2}' | xargs kill -9

pip uninstall psyneulinkviewer && pip cache purge
pip install -vv psyneulinkviewer --break-system-packages --use-pep517 && . ~/.profile && sudo chown root:root /usr/local/bin/psyneulinkviewer-linux-x64/chrome-sandbox && sudo chmod 4755 /usr/local/bin/psyneulinkviewer-linux-x64/chrome-sandbox

# Creating the .desktop file for the application
echo "[Desktop Entry]" > "$DESKTOP_FILE"
echo "Version=1.0" >> "$DESKTOP_FILE"
echo "Name=$APP_NAME" >> "$DESKTOP_FILE"

# Create the Exec command: Check if conda environment is active, if not activate the specified one
echo "Exec=bash -c '. ~/miniconda3/etc/profile.d/conda.sh && \
conda activate $PSYNEULINK_ENV && \
$SYMLINK_PATH'" >> "$DESKTOP_FILE"

# Set the custom icon
echo "Icon=$ICON_PATH" >> "$DESKTOP_FILE"
echo "Type=Application" >> "$DESKTOP_FILE"
echo "Terminal=false" >> "$DESKTOP_FILE"
echo "Categories=Application;" >> "$DESKTOP_FILE"

APP_DESKTOP="$HOME/.local/share/applications/$APP_NAME.desktop"

cp "$DESKTOP_FILE" "$APP_DESKTOP"
# Make the .desktop file executable
chmod +x "$DESKTOP_FILE"
rm "$DESKTOP_FILE"
chmod +x "$APP_DESKTOP"

echo "Application shortcut created at $APP_DESKTOP"
