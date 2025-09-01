import { Input as BaseInput } from '@zlden/react-developer-burger-ui-components';
import React from 'react';

type InputProps = React.ComponentProps<typeof BaseInput>;

export const Input: React.FC<InputProps> = (props) => <BaseInput {...props} />;
