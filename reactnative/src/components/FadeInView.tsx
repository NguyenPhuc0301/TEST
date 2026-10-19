import React, {useEffect, useRef} from 'react';
import {Animated, ViewStyle} from 'react-native';

/** Hiện nội dung mờ dần một lần khi dữ liệu vừa tải xong. */
export default function FadeInView({children, style}: {children: React.ReactNode; style?: ViewStyle}) {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {toValue: 1, duration: 450, useNativeDriver: true}).start();
  }, [opacity]);
  return <Animated.View style={[{opacity}, style]}>{children}</Animated.View>;
}
