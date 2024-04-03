import { useState, useCallback } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { requestUpdateUserProfile } from "../../api/auth";
import useUser from "../../hooks/useUser";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changeUserDataSchema } from "../../utils/Schema";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Profile = () => {
  const [cantEdit, setCantEdit] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changeUserDataSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      password: "",
    },
  });

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onSubmit = useCallback(
    async (formData) => {
      try {
        const updatedUserData = await requestUpdateUserProfile(user.id, {
          ...formData,
          Password: formData.password,
        });
        setUser(updatedUserData);
        toast.success("Profile updated successfully");
        setCantEdit(true);
      } catch (error) {
        console.error("Error updating user profile:", error);
        toast.error("An error occurred while updating the profile.");
      }
    },
    [user.id, setUser]
  );

  const toggleEdit = useCallback(() => {
    setCantEdit((prevCantEdit) => {
      if (!prevCantEdit) {
        reset();
      }
      return !prevCantEdit;
    });
  }, [reset]);

  return (
    <Container maxWidth="md" sx={{ mt: 7, mb: 3 }}>
      <Typography variant="h4" color={"primary"} textAlign={"center"}>
        Edit Profile
      </Typography>
      <Button
        type="button"
        color={!cantEdit ? "error" : "primary"}
        onClick={toggleEdit}
        variant="outlined"
        sx={{ mt: 3, width: "100%" }}
      >
        {cantEdit ? "Edit Profile" : "Cancel"}
      </Button>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 2 }}
      >
        {Object.entries({
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email",
          password: "Password",
        }).map(([field, label]) => (
          <TextField
            key={field}
            label={label}
            variant="outlined"
            fullWidth
            margin="normal"
            disabled={cantEdit && field !== "password"}
            type={
              field === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : "text"
            }
            {...register(field)}
            error={!!errors[field]}
            helperText={errors[field]?.message || ""}
            sx={{
              display: field === "password" && cantEdit ? "none" : "block",
            }}
            InputProps={
              field === "password"
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : {}
            }
          />
        ))}
        <Button
          disabled={cantEdit}
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, display: cantEdit ? "none" : "block" }}
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
