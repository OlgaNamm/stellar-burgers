import { FeedInfoUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';
import { TOrdersData } from '@utils-types';

const meta = {
  title: 'Example/FeedInfo',
  component: FeedInfoUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof FeedInfoUI>;

export default meta;
type Story = StoryObj<typeof meta>;

// без лишних полей
const mockFeed: TOrdersData = {
  orders: [
    {
      _id: '11111',
      status: 'ready', // для готовых
      name: 'Burger',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      number: 123,
      ingredients: ['Булка', 'Начинка']
    },
    {
      _id: '22222',
      status: 'pending', // для ожидающих заказов
      name: 'Burger 2',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      number: 124,
      ingredients: ['Булка', 'Начинка']
    }
  ],
  total: 12,
  totalToday: 2
};

export const DefaultFeedInfo: Story = {
  args: {
    feed: mockFeed,
    readyOrders: [123],
    pendingOrders: [124]
  }
};
