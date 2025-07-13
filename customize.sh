
ui_print "- Getting screen size"

output="$(wm size)"
if [ "$output" ]
then	width_height="$(echo $output | tr -s ' ' ':' | cut -d':' -f3)"
	width="$(echo $width_height | cut -d'x' -f1)"
	height="$(echo $width_height | cut -d'x' -f2)"
else    width=1080 height=1920
fi

ui_print "  - $width x $height"


ui_print "- Generating config file"

cat > "$MODPATH/config" <<EOF
dark
logcatlevels=WEFS
logcatbuffers=C
logcatformat=brief
logcatnocolors
dmesg=0--1
lines=80
wordwrap
fallbackwidth=$width
fallbackheight=$height
EOF


ui_print "- Symlinking service/post-fs-data scripts"

ln -s loader.sh "$MODPATH/service.sh"
ln -s loader.sh "$MODPATH/post-fs-data.sh"


ui_print "- Removing unneeded files"

for file in CHANGELOG.md
do rm "$MODPATH/$file"
done


ui_print "- Setting file permissions"

set_perm "$MODPATH/loader.sh" 0 0 0755
set_perm "$MODPATH/config" 0 0 0644
set_perm "$MODPATH/libdaemonize.so" 0 0 0755
set_perm "$MODPATH/liveboot.apk" 0 0 0644
