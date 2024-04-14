import Button from "@mui/material/Button";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import IconButton from "@mui/material/IconButton";

type Props = {
  addItem: (title: string) => void;
};

export const AddItemForm = ({ addItem }: Props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
  };

  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      addTaskHandler();
    }
  };

  const addTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      addItem(taskTitle.trim());
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  return (
    <div>
      <TextField
        label="Enter a title"
        variant={"outlined"}
        className={error ? "error" : ""}
        error={!!error}
        value={taskTitle}
        size={"small"}
        onChange={changeTaskTitleHandler}
        onKeyUp={addTaskOnKeyUpHandler}
        helperText={error}
      />

      {/* <Button
        variant="contained"
        onClick={addTaskHandler}
        style={{ background: "black" }}
      >
        X
      </Button> */}
      <IconButton onClick={addTaskHandler} color="primary">
        <AddBoxRoundedIcon />
      </IconButton>
      {/* {error && <div className={"error-message"}>{error}</div>} */}
    </div>
  );
};
