#!/bin/bash
pip install -vv psyneulinkviewer --break-system-packages --use-pep517 && source ~/.profile

# Variables
APP_NAME="PsyneulinkViewer"                                  # Name of the application
SYMLINK_PATH="/usr/local/bin/psyneulinkviewer"           # Symlink to the application you want to launch
CONDA_ENV="psyneulinkview"                                  # Conda environment to activate if none is active
ICON_PATH="/usr/local/bin/psyneulinkviewer-linux-x64/resources/app/build/logo.png"                 # Path to the custom icon
DESKTOP_FILE="$HOME/Desktop/$APP_NAME.desktop"     # Path where the desktop shortcut will be created

# Function to check if a conda environment is already active
is_conda_active() {
    if [[ -n "$CONDA_DEFAULT_ENV" ]]; then
        echo "Conda environment '$CONDA_DEFAULT_ENV' is already active."
        return 0
    else
        echo "No active conda environment found. Activating '$CONDA_ENV'..."
        return 1
    fi
}

# Creating the .desktop file for the application
echo "[Desktop Entry]" > "$DESKTOP_FILE"
echo "Version=1.0" >> "$DESKTOP_FILE"
echo "Name=$APP_NAME" >> "$DESKTOP_FILE"

# Create the Exec command: Check if conda environment is active, if not activate the specified one
echo "Exec=bash -c 'source ~/miniconda3/etc/profile.d/conda.sh && \
if ! is_conda_active; then conda activate $CONDA_ENV; fi && \
$SYMLINK_PATH'" >> "$DESKTOP_FILE"

# Set the custom icon
echo "Icon=$ICON_PATH" >> "$DESKTOP_FILE"
echo "Type=Application" >> "$DESKTOP_FILE"
echo "Terminal=false" >> "$DESKTOP_FILE"
echo "Categories=Application;" >> "$DESKTOP_FILE"

# Make the .desktop file executable
chmod +x "$DESKTOP_FILE"

echo "Desktop shortcut created at $DESKTOP_FILE"

# Function to check if conda environment is active
is_conda_active() {
    if [[ -n "$CONDA_DEFAULT_ENV" ]]; then
        return 0 # True, environment is active
    else
        return 1 # False, no environment is active
    fi
}
