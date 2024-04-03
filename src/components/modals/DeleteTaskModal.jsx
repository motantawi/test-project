import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};
function DeleteTaskModal({ open, handleClose, handleDelete }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-task-modal-title"
      aria-describedby="delete-task-modal-description"
    >
      <Box sx={style}>
        <Typography id="delete-task-modal-title" variant="h6" component="h2">
          Confirm Delete
        </Typography>
        <Typography id="delete-task-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this task?
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
          sx={{ mt: 3, mr: 1 }}
        >
          Delete
        </Button>
        <Button variant="outlined" onClick={handleClose} sx={{ mt: 3 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}

export default DeleteTaskModal;
