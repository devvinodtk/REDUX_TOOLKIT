import React, { useState } from "react";
import { addHabit, Frequency } from "../store/habits-slice";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

const AddHabitsForm: React.FC = () => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("daily");

  const dispatch = useDispatch<AppDispatch>();

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addHabit({ name, frequency }));
    }
    setName("");
  };
  return (
    <form onSubmit={handleAddHabit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Habits Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter habit name"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as Frequency)}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Habit
        </Button>
      </Box>
    </form>
  );
};

export default AddHabitsForm;
