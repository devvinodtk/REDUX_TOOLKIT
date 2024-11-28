import { Provider } from "react-redux";
import "./App.css";
import store from "./store/store";
import { Container, Typography } from "@mui/material";
import AddHabitsForm from "./components/add-habits-form";
import HabitsList from "./components/habits-list";
import HabitStats from "./components/habits-stats";

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography component="h1" variant="h2" align="center">
          Habit Tracker
        </Typography>
        <AddHabitsForm />
        <HabitsList />
        <HabitStats />
      </Container>
    </Provider>
  );
}

export default App;
