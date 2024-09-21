import { useConfig } from "@mmrl/hooks";
import { List, ListItem, ListItemButton, ListItemText, DialogTitle, Dialog, ListItemIcon, Checkbox, Button, DialogActions } from "@mui/material";

const ListItemCheckboxDialog = (props) => {
  const [config, setConfig] = useConfig();
  const [open, setOpen] = React.useState(false);

  const { conf, primary, secondary, items } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (e, item) => {
    setConfig(conf, (prev) => {
      return Object.assign(prev, {
        [item.value]: e.target.checked,
      });
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
                <Checkbox edge="start" checked={config[conf][item.value]} onChange={(e) => handleToggle(e, item)} />
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
  );
};

export { ListItemCheckboxDialog };
