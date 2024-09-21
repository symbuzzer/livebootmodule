import { useConfig } from "@mmrl/hooks";
import { List, ListItem, ListItemButton, ListItemText, DialogTitle, Dialog, ListItemIcon } from "@mui/material";
import { Check } from "@mui/icons-material";

const ListItemSelectDialog = (props) => {
  const [config, setConfig] = useConfig();
  const [open, setOpen] = React.useState(false);
  const { conf, primary, secondary, items } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (value) => {
    setOpen(false);
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
};

export { ListItemSelectDialog };
