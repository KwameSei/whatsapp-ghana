import React, { useState, useRef } from "react";
import { Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton, TextField } from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useValue } from '../../stateManagement/context/ContextProvider';
import { updatedProfile } from "../../actions/api";
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, updateUser, setLogout, setLogin, openModal, closeModal } from '../../state'

const Profile = () => {
  // const { state: { profile, user }, dispatch } = useValue();
  const nameRef = useRef();
  const phoneRef = useRef();
  const cityRef = useRef();
  const districtRef = useRef();
  const addressRef = useRef();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loginOpen = useSelector((state) => state.loginOpen);
  const modalOpen = useSelector((state) => state.modalOpen);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // dispatch({ type: "UPDATE_PROFILE", payload: { ...profile, file } });
      const photoURL = URL.createObjectURL(file);
      dispatch(updateProfile(nameRef.current.value, phoneRef.current.value, cityRef.current.value, districtRef.current.value, addressRef.current.value, photoURL, file));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const city = cityRef.current.value;
    const district = districtRef.current.value;
    const address = addressRef.current.value;
    updatedProfile(user, {name, phone, city, district, address, file: profile.file}, dispatch);
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div>
      <Dialog open={modalOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="alert-dialog-title">
          Profile Update
          <IconButton
            sx={{ position: "absolute", right: 8, top: 8, color: "grey" }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>Update your Profile</DialogContentText>
            <>
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                id="name"
                label="Name"
                type="text"
                fullWidth
                inputRef={nameRef}
                inputProps={{ minLength: 3, maxLength: 50 }}
                default={user.name}
                required
              />

              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                id="phone"
                label="Phone Number"
                type="tel"
                fullWidth
                inputRef={phoneRef}
                inputProps={{ minLength: 11, maxLength: 13 }}
                default={user.phone}
                required
              />

              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                id="city"
                label="City or Town"
                type="text"
                fullWidth
                inputRef={cityRef}
                inputProps={{ minLength: 2, maxLength: 20 }}
                default={user.city}
              />

              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                id="district"
                label="District"
                type="text"
                fullWidth
                inputRef={districtRef}
                inputProps={{ minLength: 2, maxLength: 20 }}
                default={user.district}
              />

              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                id="address"
                label="Address"
                type="text"
                fullWidth
                inputRef={addressRef}
                inputProps={{ minLength: 2, maxLength: 20 }}
                default={user.address}
              />

              <label htmlFor="profilePicture">
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <Avatar
                  src={user.photoURL}
                  sx={{ width: 100, height: 100, margin: "0 auto" }}
                />
              </label>

            </>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<Send />}
              disabled={isSubmitting}
            >
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
};

export default Profile;