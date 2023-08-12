import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';

const Slideshow = ({ images, duration }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideshowTimer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, duration);

    return () => {
      clearTimeout(slideshowTimer);
    };
  }, [currentIndex]);

  return (
    <View>
      <Image source={images[currentIndex]} style={styles.image} />
    </View>
  );
};

const styles = {
  image: {
    width: '100%',
    height: '100%',
  },
};

export default Slideshow;
