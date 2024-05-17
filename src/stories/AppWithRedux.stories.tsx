import type { Meta, StoryObj } from "@storybook/react";
import AppWithRedux from "../AppWithRedux";
import { ReduxStoreProviderDecorator } from "../state/ReduxStoreProviderDecorator";

const meta: Meta<typeof AppWithRedux> = {
  title: "TODOLIST/AppWithRedux",
  component: AppWithRedux,
  parameters: {
    layout: "centered",
  },
  decorators: [ReduxStoreProviderDecorator],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AppWithReduxStory: Story = {};
