import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { AddItemForm } from "../AddItemForm";
import { action } from "@storybook/addon-actions";
import React from "react";

const meta: Meta<typeof AddItemForm> = {
  title: "TODOLIST/AddItemForm",
  component: AddItemForm,
  parameters: {},
  tags: ["autodocs"],

  argTypes: {
    addItem: {
      description: "Button clicked inside form",
    },
  },

  args: { addItem: fn() },
};

export default meta;

type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {};

export const AddItemFormStory1 = () => (
  <AddItemForm addItem={action("addItem")} />
);
