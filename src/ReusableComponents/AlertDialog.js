import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { setDialogState } from "../Redux/gptSlice";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = ({ content = "", modelopen = false, id = "" }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(modelopen);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editableContent, setEditableContent] = React.useState(content);

  const handleClose = (value) => {
    if (value === "accept" || value === "discard") {
      setOpen(false);
    }

    dispatch(setDialogState({ status: value, content: editableContent }));
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose("discard")}
        aria-describedby={`alert-dialog-slide-description-${id}`}
        fullWidth
        maxWidth="md" // increase max width: 'sm' | 'md' | 'lg'
      >
        <DialogTitle>{t("openAiSuggestion")}</DialogTitle>

        <DialogContent>
          {isEditing ? (
            <TextField
              multiline
              fullWidth
              variant="outlined"
              value={editableContent}
              onChange={(e) => setEditableContent(e.target.value)}
              sx={{ mt: 1 }}
            />
          ) : (
            <DialogContentText id={`alert-dialog-slide-description-${id}`}>
              {editableContent}
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions>
          {isEditing ? (
            <>
              <Button
                onClick={() => {
                  setIsEditing(false);
                  handleClose("accept");
                }}
              >
                {t("save")}
              </Button>
              <Button
                onClick={() => {
                  setIsEditing(false);
                  handleClose("discard");
                }}
              >
                {t("cancel")}
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  handleClose("accept");
                }}
              >
                {t("accept")}
              </Button>
              <Button
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                {t("edit")}
              </Button>
              <Button
                onClick={() => {
                  handleClose("discard");
                }}
              >
                {t("discard")}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialogSlide;
