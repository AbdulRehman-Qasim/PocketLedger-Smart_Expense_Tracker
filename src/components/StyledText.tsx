import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

export const Text: React.FC<TextProps> = (props) => {
  // We use Outfit_400Regular for regular text, and bold mapping via style
  let fontFamily = 'Outfit_400Regular';
  
  if (props.style) {
    const flatStyle = Object.assign({}, ...(Array.isArray(props.style) ? props.style : [props.style]));
    if (flatStyle.fontWeight === 'bold' || flatStyle.fontWeight === '700') fontFamily = 'Outfit_700Bold';
    else if (flatStyle.fontWeight === '600') fontFamily = 'Outfit_600SemiBold';
    else if (flatStyle.fontWeight === '500') fontFamily = 'Outfit_500Medium';
  }

  return (
    <RNText 
      {...props} 
      style={[{ fontFamily }, props.style]} 
    />
  );
};
