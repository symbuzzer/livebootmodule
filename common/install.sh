display_info=$(dumpsys display | grep -i real | grep -vi overridedisplay)
resolution=$(echo "$display_info" | grep -o 'real.*')
width=$(echo "$resolution" | grep -oP '(?<=real )\d+(?= x )')
height=$(echo "$resolution" | grep -oP '(?<= x )\d+')

ui_print "- Getting screen size"
ui_print "  - $width"
ui_print "  - $height"

echo "#!/system/bin/sh" > "$MODPATH/0000bootlive"
echo "#app_process=/system/bin/app_process64" >> "$MODPATH/0000bootlive"
echo "DISABLE=\"/data/adb/modules/livebootmagisk/disable\"" >> "$MODPATH/0000bootlive"
echo "if ! test -e \"\$DISABLE\"; then" >> "$MODPATH/0000bootlive"
echo "NO_ADDR_COMPAT_LAYOUT_FIXUP=1 ANDROID_ROOT=/system LD_LIBRARY_PATH=/system/lib64:/system/lib64/drm:/system/lib64/hw:/vendor/lib64:/vendor/lib64/camera:/vendor/lib64/egl:/vendor/lib64/hw:/vendor/lib64/mediacas:/vendor/lib64/mediadrm:/vendor/lib64/soundfx:/system/bin:/librootjava CLASSPATH=/data/adb/modules/livebootmagisk/liveboot /data/adb/modules/livebootmagisk/libdaemonize.so /system/bin/app_process64 /system/bin --nice-name=eu.chainfire.liveboot:root eu.chainfire.liveboot.e.d /data/adb/modules/livebootmagisk/liveboot boot dark fallbackwidth=$width fallbackheight=$height logcatlevels=WEFS logcatbuffers=C logcatformat=brief logcatnocolors dmesg=0--1 lines=80 wordwrap" >> "$MODPATH/0000bootlive"
echo "fi" >> "$MODPATH/0000bootlive"

ui_print "- Boot script created"

install_script -p $MODPATH/0000bootlive
install_script -l $MODPATH/0000bootlive

ui_print "- Boot script copied necassary places"
ui_print "- Continuing to install"
