import { useConfig } from "@mmrl/hooks";
import { ListItem, ListItemText, Switch } from "@mui/material";

const ListItemSwitch = (props) => {
  const [config, setConfig] = useConfig();
  return (
    <ListItem>
      <ListItemText primary={props.primary} secondary={props.secondary} />
      <Switch checked={config[props.conf]} onChange={(e) => setConfig(props.conf, e.target.checked)} />
    </ListItem>
  );
};

export { ListItemSwitch };
