import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export interface Habit {
    id: string;
    name: string;
    frequency: Frequency;
    completedDates : string [];
    createdAt: string;
}

export type Frequency = "daily" | "weekly";

export type PayloadActionType = {
    name: string;
    frequency: Frequency
}

interface HabitState {
    habits : Habit[];
    isLoading: boolean;
    error: string | null;
}

const initialState: HabitState = {
    habits: [],
    isLoading: false,
    error: null
}

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async() => {
    await new Promise((resolve)=> setTimeout(resolve, 1000));
    const mockHabits: Habit [] = [{
        id: uuidv4(),
        name: "Read",
        frequency: "daily",
        completedDates: [],
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        name: "Exercise",
        frequency: "daily",
        completedDates: [],
        createdAt: new Date().toISOString()
    }];

    return mockHabits;
});

export const habitsSlice = createSlice({
    name: 'habits',
    initialState: initialState,
    reducers: {
        addHabit: (state, actions: PayloadAction<PayloadActionType>) => {
            const newHabit:Habit = {
                id: uuidv4(),
                name: actions.payload.name,
                frequency: actions.payload.frequency,
                completedDates : [],
                createdAt: new Date().toISOString()
            }
            state.habits.push(newHabit)
        },
        toggleHabits: (state, actions: PayloadAction<{id: string; date: string}>) => {
            const habit = state.habits.find((h) => h.id == actions.payload.id);
            if(habit) {
                const index = habit.completedDates.indexOf(actions.payload.date);
                if(index > -1) {
                    habit.completedDates.splice(index, 1);
                } else {
                    habit.completedDates.push(actions.payload.date);
                }
            }
        },
        deleteHabit: (state, actions: PayloadAction<{id: string}>) => {
            state.habits = state.habits.filter((h) => h.id !== actions.payload.id);
        }
    },
    extraReducers: (builder)=> {
        builder.addCase(fetchHabits.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchHabits.fulfilled, (state, action)=> {
            state.habits = action.payload
            state.isLoading = false
        }).addCase(fetchHabits.rejected, (state, action)=> {
            state.habits = []
            state.isLoading = false
            state.error = action.error.message || "Failed to fetch habits"
        })
    }
})

export const { addHabit, toggleHabits, deleteHabit} = habitsSlice.actions
export default habitsSlice.reducer;