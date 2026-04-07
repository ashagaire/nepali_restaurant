"use client";

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  SelectChangeEvent,
  ThemeProvider,
  createTheme,
  FormHelperText,
  InputAdornment
} from "@mui/material";
import { toast } from "react-toastify";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import NotesIcon from '@mui/icons-material/Notes';


const timeSlots = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
];

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    let newErrors: Record<string, string> = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.guests) newErrors.guests = "Number of guests is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value as string }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
        toast.error("Please fill in all required fields properly.");
        return;
    }

    toast.info("This is a demo website", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
      <Paper elevation={1} sx={{ px: { xs: 2.5, md: 4 }, py: { xs: 3.5, md: 4 }, maxWidth: 650, mx: "auto", borderTop: '2px solid #f97316' }}>
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate 
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}
        >
          {/* Date */}
          <TextField
            fullWidth
            label="Reservation Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon sx={{ color: 'primary.light' }} />
                </InputAdornment>
              ),
            }}
            error={!!errors.date}
            helperText={errors.date}
            required
            sx={{ gridColumn: '1 / -1' }}
          />

          {/* Time */}
          <FormControl fullWidth error={!!errors.time} required>
            <InputLabel id="time-label">Time</InputLabel>
            <Select
              labelId="time-label"
              name="time"
              value={formData.time}
              label="Time"
              onChange={handleSelectChange}
              MenuProps={{
                disableScrollLock: true,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "center"
                },
                PaperProps: {
                  sx: { maxHeight: 200,  borderRadius: 0.5 }
                }
              }}
              startAdornment={
                <InputAdornment position="start">
                  <AccessTimeIcon sx={{ color: 'primary.light' }} />
                </InputAdornment>
              }
            >
              {timeSlots.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
            {errors.time && <FormHelperText>{errors.time}</FormHelperText>}
          </FormControl>

          {/* Guests */}
          <FormControl fullWidth error={!!errors.guests} required>
            <InputLabel id="guests-label">Number of Guests</InputLabel>
            <Select
              labelId="guests-label"
              name="guests"
              value={formData.guests}
              label="Number of Guests"
              onChange={handleSelectChange}
              MenuProps={{
                disableScrollLock: true,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "center"
                },
                PaperProps: {
                  sx: { maxHeight: 200, borderRadius: 0.5 }
                }
              }}
              startAdornment={
                <InputAdornment position="start">
                  <GroupIcon sx={{ color: 'primary.light' }} />
                </InputAdornment>
              }
            >
              {[...Array(20).keys()].map((num) => (
                <MenuItem key={num + 1} value={(num + 1).toString()}>
                  {num + 1} {num === 0 ? "Guest" : "Guests"}
                </MenuItem>
              ))}
            </Select>
            {errors.guests && <FormHelperText>{errors.guests}</FormHelperText>}
          </FormControl>

          {/* Name */}
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: 'primary.light' }} />
                </InputAdornment>
              ),
            }}
            error={!!errors.name}
            helperText={errors.name}
            required
            sx={{ gridColumn: '1 / -1' }}
          />

          {/* Phone */}
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon sx={{ color: 'primary.light' }} />
                </InputAdornment>
              ),
            }}
            error={!!errors.phone}
            helperText={errors.phone}
            required
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: 'primary.light' }} />
                </InputAdornment>
              ),
            }}
            error={!!errors.email}
            helperText={errors.email}
            required
          />

          {/* Notes */}
          <TextField
            fullWidth
            label="Special Requests (Optional)"
            name="notes"
            multiline
            rows={4}
            value={formData.notes}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.2 }}>
                  <NotesIcon sx={{ color: 'primary.light' }} />
                </InputAdornment>
              ),
            }}
            sx={{ gridColumn: '1 / -1' }}
          />

          {/* Submit Button */}
          <Box sx={{ gridColumn: '1 / -1', mt: 1, display: 'flex', justifyContent: 'left' }}>
            <Button
              type="submit"
              // fullWidth
              
              variant="contained"
              size="medium"
              sx={{ py: 1.5, boxShadow: 2 }}
            >
              Confirm Reservation
            </Button>
          </Box>
        </Box>
      </Paper>
  );
}
