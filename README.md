# LiveBoot Magisk & KernelSU & APatch Module

## Description

- A Magisk, KernelSU and APatch module that enables unix-style (verbose) boot animation for Android devices
- Magisk, KernelSU and APatch module of [Chainfire](https://github.com/Chainfire)'s [LiveBoot](https://github.com/Chainfire/liveboot) app without any app or UI

Preview: https://www.youtube.com/watch?v=N0tqzVWxpJk

## Supported devices & ROMs

It has been successfully tested on many Android 14, 13 and 12 based ROMs. Should work all rooted devices via Magisk, KernelSU and APatch.

## Download

[Releases](https://github.com/symbuzzer/livebootmodule/releases)

## Changelog

[CHANGELOG.md](https://github.com/symbuzzer/livebootmodule/blob/main/CHANGELOG.md)

## Liveboot Customization Guide

### How to Edit Settings

To customize Liveboot settings:

> [!NOTE] > `0000liveboot` is stored in three directories, `/data/adb/service.d`, `/data/adb/post-fs-data.d` and `/data/adb/livebootmagisk`. It is recommended to have in every three directories the same file content.

1. Navigate to the `/data/adb/service.d` directory.
2. Open the `0000bootlive` file using a text editor.
3. Modify the settings as per your requirements (listed below). **⚠️ Warning: don't edit anything else in the file! ⚠️**
4. Save the file and reboot your device to apply the changes.

### Via an app interface

Install [MMRL](htpps://github.com/DerGoogler/MMRL/releases) if you haven't already. Open the app and navigate to "installed", search for the **LiveBoot Magisk** module and click on "Config"

### Manual Customization Options

- Background colors: ` ` (no character, it's the default Liveboot app's gray-ish background color), `dark`, `transparent`
- Logcat levels: `V` (Verbose), `D` (Debug), `I` (Info), `W` (Warning), `E` (Error), `F` (Fatal), `S` (Silent)
- Logcat buffers: `M` (Main), `S` (System), `R` (Radio), `E` (Events), `C` (Crash)
- Logcat formats: `brief`, `process`, `tag`, `thread`, `time`, `threadtime`
- Logcat colors: `colors`, `logcatnocolors`
- DMESG: `0--1` (dmesg off), `0-99` (dmesg on)
- Lines: any value you want
- Wordwrap: `wordwrap`, ` ` (no character)
- Save logs: `save` (saves log in `/data/cache`, just like in the app), ` ` (no character)
- Fallback width and fallback height: usually your device's screen resolution, but you can put other values to spoof another screen size

### Example Configuration

```bash
transparent logcatlevels=VDIWEFS logcatbuffers=MSREC logcatformat=threadtime colors dmesg=0-99 lines=80 wordwrap save fallbackwidth=1080 fallbackheight=2340
```

## Licenses

- 0000bootlive (original is 0000liveboot), liveboot(.apk), libdaemonize.so files are licensed under the [GPLv3](https://github.com/Chainfire/liveboot/blob/master/LICENSE) by [Jorrit "Chainfire" Jongma](https://github.com/Chainfire).
- For detailed licenses: [COPYING](https://github.com/Chainfire/liveboot/blob/master/COPYING), [LICENSE](https://github.com/Chainfire/liveboot/blob/master/LICENSE)
- Other parts of this project are licensed under [GPLv3](https://github.com/symbuzzer/livebootmagisk/blob/main/LICENSE) too.
