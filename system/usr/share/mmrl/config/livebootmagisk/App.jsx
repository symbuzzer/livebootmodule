import { Page, CodeBlock } from "@mmrl/ui";
import { useConfig, useConfirm } from "@mmrl/hooks";
import { List, ListSubheader, Button, Divider, TextField, Box } from "@mui/material";

import { useFindExistingFile } from "./hooks/useFindExistingFile";

import { ListItemSwitch } from "./components/ListItemSwitch";
import { ListItemSelectDialog } from "./components/ListItemSelectDialog";
import { ListItemCheckboxDialog } from "./components/ListItemCheckboxDialog";
import { RenderToolbar } from "./components/RenderToolbar";

import backgroundsList from "./json/backgroundsList.json"
import logcatBuffersList from "./json/logcatBuffersList.json"
import logcatFormatsList from "./json/logcatFormatsList.json"
import logcatLevelsList from "./json/logcatLevelsList.json"
import serviceFiles from "./json/serviceFiles.json"


const App = () => {
  const serviceScript = useFindExistingFile(serviceFiles);

  if (serviceScript === null) {
    return (
      <Page sx={{ p: 2 }} renderToolbar={RenderToolbar({title: "LiveBoot Magisk"})}>
        <Box>Unable to find service script</Box>
      </Page>
    );
  }

  const confirm = useConfirm();
  const [config, setConfig] = useConfig();

  const logcatbuffers = React.useMemo(
    () =>
      Object.entries(config.logcatbuffers)
        .map((buf) => {
          const key = buf[0];
          const value = buf[1];
          if (value) return key;
        })
        .join(""),
    [config]
  );

  const logcatlevels = React.useMemo(
    () =>
      Object.entries(config.logcatlevels)
        .map((lvl) => {
          const key = lvl[0];
          const value = lvl[1];
          if (value) return key;
        })
        .join(""),
    [config]
  );

  const parsedScript = React.useMemo(() => {
    let command = "";

    if (config.background) command += `${config.background} `;
    if (config.colors) {
      command += "colors ";
    } else {
      command += "logcatnocolors ";
    }
    if (config.wordwrap) command += "wordwrap ";
    if (config.save) command += "save ";

    if (logcatlevels.length !== 0) {
      command += `logcatlevels=${logcatlevels} `;
    }

    if (logcatbuffers.length !== 0) {
      command += `logcatbuffers=${logcatbuffers} `;
    }

    command += `logcatformat=${config.logcatformat} `;

    if (config.dmesg) {
      command += `dmesg=0-99 `;
    } else {
      command += `dmesg=0--1 `;
    }

    command += `lines=${config.lines} `;

    const parsedCommand = command.trim();
    const scriptContent = serviceScript.read();

    return scriptContent.replace(/(\/data\/adb\/modules\/livebootmagisk\/liveboot\s+boot\s+)(.+)(\s+fallbackwidth=(\d+)\s+fallbackheight=(\d+))/im, "$1" + parsedCommand + "$3");
  }, [config]);

  const findBackground = React.useMemo(() => backgroundsList.find((t) => t.value === config.background), [config.background]);
  const findLogcatFormat = React.useMemo(() => logcatFormatsList.find((t) => t.value === config.logcatformat), [config.logcatformat]);
  const findLogcatBuffers = React.useMemo(() => logcatBuffersList.filter((buf) => logcatbuffers.includes(buf.value)).map((n) => n.name), [config.logcatbuffers]);
  const findLogcatLevels = React.useMemo(() => logcatLevelsList.filter((lvl) => logcatlevels.includes(lvl.value)).map((n) => n.name), [config.logcatlevels]);

  return (
    <Page sx={{ p: 2 }} renderToolbar={RenderToolbar({title: "LiveBoot Magisk"})}>
      <CodeBlock lang="bash">{parsedScript}</CodeBlock>

      <Button
        onClick={() => {
          confirm({
            title: "Save service script?",
            description: (
              <>
                Are you sure that you want to save the current configured service script? By pressing "Yes" the current script will be overwritten in{" "}
                <pre style={{ display: "inline" }}>/data/adb/service.d</pre> and <pre style={{ display: "inline" }}>/data/adb/post-fs-data.d</pre>.
              </>
            ),
            confirmationText: "Yes",
            cancellationText: "No",
          })
            .then(() => {
              for (const filePath of serviceFiles) {
                const file = new SuFile(String(filePath));
                if (file.exist()) {
                  file.write(parsedScript);
                } else {
                  file.create(SuFile.NEW_FILE);
                  file.write(parsedScript);
                }
              }
            })
            .catch(() => {});
        }}
        variant="contained"
        fullWidth
        sx={{ mt: 1 }}
      >
        Save
      </Button>

      <List subheader={<ListSubheader>Logcat appearence</ListSubheader>}>
        <ListItemSwitch conf="wordwrap" primary="Word wrap" />
        <ListItemSwitch conf="colors" primary="Colorful logs" />
        <ListItemSelectDialog conf="background" primary="Background" secondary={findBackground.name} items={backgroundsList} />
      </List>

      <Divider />

      <List subheader={<ListSubheader>Settings</ListSubheader>}>
        <ListItemSelectDialog conf="logcatformat" primary="Logcat format" secondary={findLogcatFormat.name} items={logcatFormatsList} />
        <ListItemCheckboxDialog conf="logcatbuffers" primary="Logcat buffers" secondary={findLogcatBuffers.join(", ")} items={logcatBuffersList} />
        <ListItemCheckboxDialog conf="logcatlevels" primary="Logcat levels" secondary={findLogcatLevels.join(", ")} items={logcatLevelsList} />
      </List>

      <Divider />

      <List subheader={<ListSubheader>Other</ListSubheader>}>
        <ListItemSwitch conf="save" primary="Save logs" />
        <ListItemSwitch conf="dmesg" primary="DMESG" />
        <TextField
          sx={{ m: 1, width: "calc(100% - 16px)" }}
          type="number"
          label="Lines"
          variant="outlined"
          value={config.lines}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 5);
          }}
          onChange={(e) => setConfig("lines", e.target.value)}
        />
      </List>
    </Page>
  );
};

export { App };
