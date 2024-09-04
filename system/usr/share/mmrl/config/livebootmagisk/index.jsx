import { Page, Toolbar, CodeBlock } from "@mmrl/ui";
import { useActivity, useConfig, useConfirm } from "@mmrl/hooks";
import { withRequireNewVersion } from "@mmrl/hoc";
import { ConfigProvider } from "@mmrl/providers";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  DialogTitle,
  Dialog,
  ListItemIcon,
  Switch,
  Checkbox,
  Button,
  Divider,
  TextField,
  Box,
  DialogActions
} from "@mui/material";
import { Check } from "@mui/icons-material"

const initialConfig = {
  background: "dark",
  colors: false,
  wordwrap: true,
  logcatlevels: {
    V: false,
    D: false,
    I: false,
    W: true,
    E: true,
    F: true,
    S: true,
  },
  logcatbuffers: {
    M: false,
    S: false,
    R: false,
    E: false,
    C: true,
  },
  logcatformat: 'brief',
  dmesg: false,
  lines: '80',
  save: false,
}
const backgroundsList = [
  {
    name: "Default",
    value: " "
  },
  {
    name: "Transparent",
    value: "transparent"
  },
  {
    name: "Dark",
    value: "dark"
  },
]

const logcatFormatsList = [
  {
    name: "Brief",
    value: "brief"
  },
  {
    name: "Process",
    value: "process"
  },
  {
    name: "Tag",
    value: "tag"
  },
  {
    name: "Thread",
    value: "thread"
  },
  {
    name: "Time",
    value: "time"
  },
  {
    name: "Thread time",
    value: "threadtime"
  }
]

const logcatBuffersList = [
  {
    name: "Main",
    value: "M"
  },
  {
    name: "System",
    value: "S"
  },
  {
    name: "Radio",
    value: "R"
  },
  {
    name: "Events",
    value: "E"
  },
  {
    name: "Crash",
    value: "C"
  },
]

const logcatLevelsList = [
  {
    name: "Verbose",
    value: "V"
  },
  {
    name: "Debug",
    value: "D"
  },
  {
    name: "Info",
    value: "I"
  },
  {
    name: "Warning",
    value: "W"
  },
  {
    name: "Error",
    value: "E"
  },
  {
    name: "Fatal",
    value: "F"
  },
  {
    name: "Silent",
    value: "S"
  },
]

const RenderToolbar = () => {
  const { context } = useActivity()

  return (
    <Toolbar modifier="noshadow">
      <Toolbar.Left>
        <Toolbar.BackButton onClick={context.popPage} />
      </Toolbar.Left>
      <Toolbar.Center>
        Liveboot Magisk
      </Toolbar.Center>
    </Toolbar>
  )
}

function ListItemSelectDialog(props) {
  const [config, setConfig] = useConfig();
  const [open, setOpen] = React.useState(false);
  const { conf, primary, secondary, items } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
    setConfig(conf, items[0].value)
  };

  const handleListItemClick = (value) => {
    setOpen(false)
    setConfig(conf, value);
  };

  return (
    <>
      <ListItemButton onClick={handleClickOpen}>
        <ListItemText primary={primary} secondary={secondary} />
      </ListItemButton>
      <Dialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle>{primary}</DialogTitle>
        <List sx={{ pt: 0 }}>
          {items.map((item) => (
            <ListItem disablePadding key={item.value}>
              <ListItemButton onClick={() => handleListItemClick(item.value)}>
                <ListItemText primary={item.name} />
                {item.value === config[conf] && (
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon>
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
}

const ListItemCheckboxDialog = (props) => {
  const [config, setConfig] = useConfig();
  const [open, setOpen] = React.useState(false);

  const { conf, primary, secondary, items } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  };

  const handleToggle = (e, item) => {
    setConfig(conf, (prev) => {
      return Object.assign(prev, {
        [item.value]: e.target.checked
      })
    });
  };

  return (
    <>
      <ListItemButton onClick={handleClickOpen}>
        <ListItemText primary={primary} secondary={secondary} />
      </ListItemButton>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>{props.primary}</DialogTitle>

        <List>
          {items.map((item) => (
            <ListItem key={item.value}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={config[conf][item.value]}
                  onChange={(e) => handleToggle(e, item)}


                />
              </ListItemIcon>
              <ListItemText primary={item.name} secondary={item.desc} />
            </ListItem>
          ))}
        </List>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>

        </DialogActions>
      </Dialog>
    </>
  )
}

const ListItemSwitch = (props) => {
  const [config, setConfig] = useConfig();
  return (
    <ListItem>
      <ListItemText primary={props.primary} secondary={props.secondary} />
      <Switch checked={config[props.conf]} onChange={(e) => setConfig(props.conf, e.target.checked)} />
    </ListItem>
  )
}


function useFindExistingFile(filePaths) {
  const [config] = useConfig()
  return React.useMemo(() => {
    for (const filePath of filePaths) {
      const file = new SuFile(String(filePath))
      if (file.exist()) {
        return file;
      }
    }
    return null;
  }, [config])
}

const serviceFiles = ["/data/adb/service.d/0000bootlive", "/data/adb/post-fs-data.d/0000bootlive", "/data/adb/modules/livebootmagisk/0000bootlive"]
const App = () => {
  const serviceScript = useFindExistingFile(serviceFiles)

  if (serviceScript === null) {
    return (
      <Page sx={{ p: 2 }} renderToolbar={RenderToolbar}>
        <Box>
          Unable to find service script
        </Box>
      </Page>
    )
  }

  const confirm = useConfirm()
  const [config, setConfig] = useConfig();

  const logcatbuffers = React.useMemo(() => Object.entries(config.logcatbuffers).map((buf) => {
    const key = buf[0]
    const value = buf[1]
    if (value) return key
  }).join(""), [config])

  const logcatlevels = React.useMemo(() => Object.entries(config.logcatlevels).map((lvl) => {
    const key = lvl[0]
    const value = lvl[1]
    if (value) return key
  }).join(""), [config])

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


    const parsedCommand = command.trim()
    const scriptContent = serviceScript.read()

    return scriptContent.replace(/(\/data\/adb\/modules\/livebootmagisk\/liveboot\s+boot\s+)(.+)(\s+fallbackwidth=(\d+)\s+fallbackheight=(\d+))/mi, "$1" + parsedCommand + "$3");
  }, [config])

  const findBackground = React.useMemo(() => backgroundsList.find((t) => t.value === config.background), [config.background])
  const findLogcatFormat = React.useMemo(() => logcatFormatsList.find((t) => t.value === config.logcatformat), [config.logcatformat])
  const findLogcatBuffers = React.useMemo(() => logcatBuffersList.filter((buf) => logcatbuffers.includes(buf.value)).map((n) => n.name), [config.logcatbuffers])
  const findLogcatLevels = React.useMemo(() => logcatLevelsList.filter((lvl) => logcatlevels.includes(lvl.value)).map((n) => n.name), [config.logcatlevels])

  

  return (
    <Page sx={{ p: 2 }} renderToolbar={RenderToolbar}>

      <CodeBlock lang="bash">{parsedScript}</CodeBlock>

      <Button onClick={() => {
        confirm({
          title: "Save service script?",
          description: <>Are you sure that you want to save the current configured service script? By pressing "Yes" the current script will be overwritten in <pre style={{ display: "inline" }}>/data/adb/service.d</pre> and <pre style={{ display: "inline" }}>/data/adb/post-fs-data.d</pre>.</>,
          confirmationText: "Yes",
          cancellationText: "No"
        }).then(() => {
          for (const filePath of serviceFiles) {
            const file = new SuFile(String(filePath))
            if (file.exist()) {
              file.write(parsedScript)
            } else {
              file.create(SuFile.NEW_FILE)
              file.write(parsedScript)
            }
          }
        }).catch(() => { })
      }} variant="contained" fullWidth sx={{ mt: 1 }}>Save</Button>

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
            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 5)
          }}
          onChange={(e) => setConfig("lines", e.target.value)} />
      </List>
    </Page>
  )
}

export default withRequireNewVersion({
  versionCode: 32325,
  component: () => {
    return (
      <ConfigProvider
        loadFromFile="/data/adb/liveboot.config.json"
        initialConfig={initialConfig}
        loader="json"
      >
        <App />
      </ConfigProvider>
    );
  },
});
