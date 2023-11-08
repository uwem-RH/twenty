import { Meta, StoryObj } from '@storybook/react';

import { ComponentDecorator } from '~/testing/decorators/ComponentDecorator';

import { SettingsObjectFieldPreview } from '../SettingsObjectFieldPreview';

const meta: Meta<typeof SettingsObjectFieldPreview> = {
  title: 'Modules/Settings/DataModel/SettingsObjectFieldPreview',
  component: SettingsObjectFieldPreview,
  decorators: [ComponentDecorator],
  args: {
    fieldIconKey: 'IconNotes',
    fieldLabel: 'Description',
    fieldType: 'TEXT',
    isObjectCustom: false,
    objectIconKey: 'IconBuildingSkyscraper',
    objectLabelPlural: 'Companies',
    objectNamePlural: 'companies',
  },
};

export default meta;
type Story = StoryObj<typeof SettingsObjectFieldPreview>;

export const Text: Story = {};

export const Number: Story = {
  args: {
    fieldIconKey: 'IconUsers',
    fieldLabel: 'Employees',
    fieldType: 'NUMBER',
  },
};

export const Boolean: Story = {
  args: {
    fieldIconKey: 'IconHeadphones',
    fieldLabel: 'Priority Support',
    fieldType: 'BOOLEAN',
  },
};

export const CustomObject: Story = {
  args: {
    isObjectCustom: true,
    objectIconKey: 'IconApps',
    objectLabelPlural: 'Workspaces',
    objectNamePlural: 'workspaces',
  },
};
