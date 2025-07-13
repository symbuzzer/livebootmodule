#!/system/bin/sh
MODDIR="${0%/*}"
NO_ADDR_COMPAT_LAYOUT_FIXUP=1 ANDROID_ROOT=/system LD_LIBRARY_PATH=/system/lib64:/system/lib64/drm:/system/lib64/hw:/vendor/lib64:/vendor/lib64/camera:/vendor/lib64/egl:/vendor/lib64/hw:/vendor/lib64/mediacas:/vendor/lib64/mediadrm:/vendor/lib64/soundfx:/system/bin:/librootjava CLASSPATH="$MODDIR/liveboot.apk" "$MODDIR/libdaemonize.so" /system/bin/app_process64 /system/bin --nice-name=eu.chainfire.liveboot:root V.d "$MODDIR/liveboot.apk" boot $(cat "$MODDIR/config")
