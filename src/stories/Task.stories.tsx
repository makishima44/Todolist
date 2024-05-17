import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Task } from "../Task";
import React, { useState } from "react";
import { v1 } from "uuid";
import { func } from "prop-types";

const meta: Meta<typeof Task> = {
  title: "TODOLIST/Task",
  component: Task,
  parameters: {
    layout: "centered",
  },
  args: {
    task: { id: "qasdas", isDone: false, title: "JS" },
    todolistId: "asd1212",
    changeTaskTitle: fn(),
    changeTaskStatus: fn(),
    removeTask: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
  args: {
    task: { id: "qasdasq", isDone: true, title: "CSS" },
  },
};

export const TaskToggleStory: Story = {
  render: (args) => {
    const [task, setTask] = useState({
      id: v1(),
      isDone: true,
      title: "CSS",
    });

    function changeTaskStatus() {
      setTask({ ...task, isDone: !task.isDone });
    }

    function changeTaskTitle(taskId: string, newTitle: string) {
      setTask({ ...task, title: newTitle });
    }

    return (
      <Task
        task={task}
        todolistId={"asd1212"}
        changeTaskTitle={changeTaskTitle}
        changeTaskStatus={changeTaskStatus}
        removeTask={args.removeTask}
      />
    );
  },
};
