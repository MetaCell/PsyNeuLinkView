#!/bin/bash

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

# Variables - adjust these for your setup
APP_PATH="$HOME/psyneulinkviewer-darwin-x64/psyneulinkviewer.app/"
CONDA_ENV=$PSYNEULINK_ENV
ICON_PATH="$HOME/psyneulinkviewer-darwin-x64/psyneulinkviewer.app/Contents/Resources/electron.icns" 
SHORTCUT_NAME="PsyneulinkViewer" 

# Define paths
DESKTOP_PATH="$HOME/Desktop"
APP_SHORTCUT_PATH="$DESKTOP_PATH/$SHORTCUT_NAME.app"
COMMAND_FILE_PATH="$APP_SHORTCUT_PATH/Contents/MacOS/$SHORTCUT_NAME"
ICON_FILE_PATH="$APP_SHORTCUT_PATH/Contents/Resources/$SHORTCUT_NAME.icns"

rm -rf "$APP_SHORTCUT_PATH"
# Cleanup existing installations of psneulinkviewer
rm -rf "$HOME/psyneulinkviewer-darwin-x64/"
rm -rf "$DESKTOP_PATH/$SHORTCUT_NAME.app"

ps aux | grep rpc_server | grep -v grep | awk '{print $2}' | xargs kill -9

pip uninstall psyneulinkviewer && pip cache purge
pip install -vv psyneulinkviewer --break-system-packages --use-pep517 && source ~/.bashrc_profile
check_last_command

# Create .app structure
mkdir -p "$APP_SHORTCUT_PATH/Contents/MacOS"
mkdir -p "$APP_SHORTCUT_PATH/Contents/Resources"

# Try to find conda.sh, limit search to likely locations
CONDA_SH=$(find ~ -maxdepth 4 -name conda.sh 2>/dev/null | head -n 1)

echo "Conda.sh found at $CONDA_SH"

# If conda.sh is not found, try the default locations
if [[ -z "$CONDA_SH" ]]; then
    if [[ -f "$HOME/anaconda3/etc/profile.d/conda.sh" ]]; then
        CONDA_SH="$HOME/anaconda3/etc/profile.d/conda.sh"
    elif [[ -f "$HOME/miniconda3/etc/profile.d/conda.sh" ]]; then
        CONDA_SH="$HOME/miniconda3/etc/profile.d/conda.sh"
    elif [[ -z "$CONDA_SH" ]]; then
        CONDA_SH=$(find / -maxdepth 8 -name conda.sh 2>/dev/null | head -n 1)
    fi
fi

# Check if conda.sh was found
if [[ -z "$CONDA_SH" ]]; then
    echo "Error: conda.sh not found! Please ensure Conda is installed properly."
    exit 1
else
    echo "Conda.sh found at $CONDA_SH"
fi

# Write the .command file that launches the app with conda environment
cat <<EOL > "$COMMAND_FILE_PATH"
#!/bin/bash
source ~/.bashrc_profile
source $CONDA_SH
conda activate $PSYNEULINK_ENV
open "$APP_PATH"
EOL

# Make the script executable
chmod +x "$COMMAND_FILE_PATH"

# Copy the custom icon
cp "$ICON_PATH" "$ICON_FILE_PATH"

# Create Info.plist for the app
cat <<EOL > "$APP_SHORTCUT_PATH/Contents/Info.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>$SHORTCUT_NAME</string>
    <key>CFBundleIconFile</key>
    <string>$SHORTCUT_NAME</string>
    <key>CFBundleIdentifier</key>
    <string>com.example.$SHORTCUT_NAME</string>
    <key>CFBundleName</key>
    <string>$SHORTCUT_NAME</string>
    <key>CFBundleVersion</key>
    <string>1.0</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
</dict>
</plist>
EOL

# Set the correct file permissions for the .app
chmod -R 755 "$APP_SHORTCUT_PATH"

# Touch the app to refresh Finder so it displays the correct icon
touch "$APP_SHORTCUT_PATH"

echo "Shortcut created at $DESKTOP_PATH/$SHORTCUT_NAME.app"