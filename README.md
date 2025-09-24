# LiveBoot Magisk & KernelSU & APatch Module

## Description

- A Magisk, KernelSU and APatch module that enables unix-style (verbose) boot animation for Android devices
- Magisk, KernelSU and APatch module of [Chainfire](https://github.com/Chainfire)'s [LiveBoot](https://github.com/Chainfire/liveboot) app without any app or UI

Preview: https://www.youtube.com/watch?v=N0tqzVWxpJk

## Supported devices & ROMs

It has been successfully tested on many Android 15, 14, 13 and 12 based ROMs. Should work all rooted devices via Magisk, KernelSU and APatch.

## Download

[Releases](https://github.com/symbuzzer/livebootmodule/releases)

## Changelog

[CHANGELOG.md](https://github.com/symbuzzer/livebootmodule/blob/main/CHANGELOG.md)

## LiveBoot Customization Guide

> [!NOTE]
> `loader.sh`, `config` and `liveboot.apk` are in the directory `/data/adb/modules/livebootmagisk`.

1. Open `config` file using a text editor.
2. Modify the settings as per your requirements (listed below). **⚠️Warning: don't add anything else (even a comment line) to the file!⚠️**
3. Save the files and reboot your device to apply the changes.

#### Manual Customization Options

- Background colors: ` ` (no character, it's the default LiveBoot app's gray-ish background color), `dark`, `transparent`
- Logcat levels: `V` (Verbose), `D` (Debug), `I` (Info), `W` (Warning), `E` (Error), `F` (Fatal), `S` (Silent)
- Logcat buffers: `M` (Main), `S` (System), `R` (Radio), `E` (Events), `C` (Crash)
- Logcat formats: `brief`, `process`, `tag`, `thread`, `time`, `threadtime`
- Logcat colors: `colors`, `logcatnocolors`
- DMESG: `0--1` (off), `0-99` (on)
- Lines: any value you want
- Wordwrap: `wordwrap`, ` ` (no character)
- Save logs: `save` (saves log in `/data/cache`, just like in the app), ` ` (no character)
- Fallback width and fallback height: usually your device's screen resolution, but you can put other values to spoof another screen size

#### Example Configuration

```sh
transparent
logcatlevels=VDIWEFS
logcatbuffers=MSREC
logcatformat=threadtime
colors
dmesg=0-99
lines=80
wordwrap
save
fallbackwidth=1080
fallbackheight=2340
```

## Licenses

- loader.sh (originally 0000liveboot), liveboot.apk, libdaemonize.so files* are licensed under the [GPLv3](https://github.com/Chainfire/liveboot/blob/master/LICENSE) by [Jorrit "Chainfire" Jongma](https://github.com/Chainfire).
- For detailed licenses: [COPYING](https://github.com/Chainfire/liveboot/blob/master/COPYING), [LICENSE](https://github.com/Chainfire/liveboot/blob/master/LICENSE)
- Other parts of this project are licensed under [GPLv3](https://github.com/symbuzzer/livebootmagisk/blob/main/LICENSE) too.

**Source: https://github.com/Chainfire/liveboot/tree/master/liveBootAni2/src/main/java/eu/chainfire/liveboot*
