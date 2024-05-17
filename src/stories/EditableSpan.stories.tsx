import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { EditableSpan } from "../EditableSpan";
import React, { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";

const meta: Meta<typeof EditableSpan> = {
  title: "TODOLIST/T",
  component: EditableSpan,
  parameters: {
    layout: "centered",
  },
  args: {
    value: "span mode",
    onChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const EditableSpanStory: Story = {
  render: (args) => {
    let [editMode, setEditMode] = useState(false);

    const activateViewMode = () => {
      setEditMode(false);
      args.onChange("sss");
    };
    return editMode ? (
      <TextField value={"EditMode"} onChange={fn()} autoFocus onBlur={fn()} />
    ) : (
      <span onDoubleClick={activateViewMode}>{args.value}</span>
    );
  },
};

export const EditableSpanEditModeStory: Story = {
  render: (args) => {
    let [editMode, setEditMode] = useState(true);

    const activateViewMode = () => {
      setEditMode(false);
      args.onChange("sss");
    };
    return editMode ? (
      <TextField value={"EditMode"} onChange={fn()} autoFocus onBlur={fn()} />
    ) : (
      <span onDoubleClick={activateViewMode}>{args.value}</span>
    );
  },
};

export const EditableSpanToggleStory: Story = {
  render: (args) => {
    let [editMode, setEditMode] = useState(true);
    let [title, setTitle] = useState(args.value);

    const activateEditMode = () => {
      setEditMode(true);
      setTitle(args.value);
    };

    const activateViewMode = () => {
      setEditMode(false);
      args.onChange("sss");
    };

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    };
    return editMode ? (
      <TextField
        value={title}
        onChange={changeTitle}
        autoFocus
        onBlur={activateViewMode}
      />
    ) : (
      <span onDoubleClick={activateEditMode}>{args.value}</span>
    );
  },
};
