#!/bin/bash -icl

RUN_FLAG=0

if [ $RUN_FLAG -eq 0 ]; then
    command -v xterm >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        xterm -fa 'Monospace' -fs 14 -hold -e $SHELL -ilc "cd $HOME && curl -H \"Cache-Control: no-cache\" https://raw.githubusercontent.com/MetaCell/PsyNeuLinkView/develop/package/scripts/linux_installer.sh -o linux_installer.sh && chmod +x linux_installer.sh && bash linux_installer.sh && rm -f linux_installer.sh"
        RUN_FLAG=1
    fi
fi

if [ $RUN_FLAG -eq 0 ]; then
    command -v konsole >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        konsole --noclose -e $SHELL -ilc "cd $HOME && curl -H \"Cache-Control: no-cache\" https://raw.githubusercontent.com/MetaCell/PsyNeuLinkView/develop/package/scripts/linux_installer.sh -o linux_installer.sh && chmod +x linux_installer.sh && bash linux_installer.sh && rm -f linux_installer.sh"
        RUN_FLAG=1
    fi
fi

if [ $RUN_FLAG -eq 0 ]; then
    command -v gnome-terminal >/dev/null
    if [ $? -eq 0 ]; then
        gnome-terminal -- $SHELL -ilc "cd $HOME && curl -H \"Cache-Control: no-cache\" https://raw.githubusercontent.com/MetaCell/PsyNeuLinkView/develop/package/scripts/linux_installer.sh -o linux_installer.sh && chmod +x linux_installer.sh && bash linux_installer.sh && rm -f linux_installer.sh; exec bash"
        RUN_FLAG=1
    fi
fi

if [ $RUN_FLAG -eq 0 ]; then
    command -v notify-send >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        notify-send "PsyNeuLinkViewer installation ERROR: No terminal found" "Try the manual installation documented in the github README."
    else
        xmessage -center -buttons 'Close':0 -default Ok -nearmouse "Error during the PsyNeuLinkViewer installation: No terminal found\nPlease try to download the linux installer bash script and run this manually from your terminal as documented in the repository README."
    fi
fi
