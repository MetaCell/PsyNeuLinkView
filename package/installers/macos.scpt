osascript -e 'tell app "Terminal"
    do script "cd ~ && curl -H \"Cache-Control: no-cache\" https://raw.githubusercontent.com/MetaCell/PsyNeuLinkView/develop/package/scripts/mac_installer.sh -o mac_installer.sh && chmod +x mac_installer.sh && ./mac_installer.sh && rm -f mac_installer.sh"
end tell' > /dev/null
