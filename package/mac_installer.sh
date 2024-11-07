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


pip install -vv psyneulinkviewer --break-system-packages --use-pep517 && source ~/.bashrc_profile
check_last_command();

# Variables - adjust these for your setup
APP_PATH="$HOME/psyneulinkviewer-darwin-x64/psyneulinkviewer.app/"  # Replace with the full path to the application
CONDA_ENV=$PSYNEULINK_ENV              # Replace with your Conda environment name
ICON_PATH="$HOME/psyneulinkviewer-darwin-x64/psyneulinkviewer.app/Contents/Resources/electron.icns"        # Replace with the full path to your custom icon (should be in .icns format)
SHORTCUT_NAME="PsyneulinkViewer"         # Name for the desktop shortcut

# Define paths
DESKTOP_PATH="$HOME/Desktop"
APP_SHORTCUT_PATH="$DESKTOP_PATH/$SHORTCUT_NAME.app"
COMMAND_FILE_PATH="$APP_SHORTCUT_PATH/Contents/MacOS/$SHORTCUT_NAME"
ICON_FILE_PATH="$APP_SHORTCUT_PATH/Contents/Resources/$SHORTCUT_NAME.icns"

# Create .app structure
rm -rf "$APP_SHORTCUT_PATH"
mkdir -p "$APP_SHORTCUT_PATH/Contents/MacOS"
mkdir -p "$APP_SHORTCUT_PATH/Contents/Resources"
# Write the .command file that launches the app with conda environment
cat <<EOL > "$COMMAND_FILE_PATH"

#!/bin/bash
source ~/.bashrc_profile
source ~/miniconda3/etc/profile.d/conda.sh
conda activate $CONDA_ENV
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
