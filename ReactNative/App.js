import {
  View,
  Text,
  ScrollView,
  Button,
  Alert,
  Image,
  Touchable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import RNCalendarEvents from 'react-native-calendar-events';
import Video from 'react-native-video';
import { Benchmark } from 'react-component-benchmark';

const App = () => {
  const ref = React.useRef();

  const handleComplete = React.useCallback(results => {
    console.log(results.endTime - results.startTime);
  }, []);

  const handleStart = () => {
    ref.current.start();
  };

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={handleStart} title="RUN" />
      <Benchmark
        component={MemorizedVideos}
        samples={1}
        onComplete={handleComplete}
        ref={ref}
        timeout={1000000}
        type="mount"
      />
      {/* <MemorizedTenThousandTextFields /> */}
      <MemorizedVideos />
    </View>
  );
};

export default App;

const TenThousandArray = [...Array(10000)].fill(0);

const EmptyView = () => {
  return <View />;
};
const MemorizedTenThousandEmptyViews = () => {
  const renderItem = useCallback(({ item }) => {
    return <EmptyView item={item} />;
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={TenThousandArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};
const TenThousandEmptyViews = () => {
  return (
    <View>
      {[...Array(10000)].map((_, index) => (
        <View key={index} />
      ))}
    </View>
  );
};

const MemorizedText = memo(({ item }) => {
  return <Text>Hello World</Text>;
});
const MemorizedTenThousandTextFields = () => {
  const renderText = useCallback(({ item }) => {
    return <MemorizedText item={item} />;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={TenThousandArray}
        renderItem={renderText}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const MemorizedHundredCalendarEvent = () => {
  const [isPermission, setIsPermission] = useState(false);

  useEffect(() => {
    RNCalendarEvents.checkPermissions(true).then(result => {
      if (result === 'authorized') {
        setIsPermission(true);
      }
    });
  }, [isPermission]);
  return (
    <View>
      {isPermission ? (
        <CalendarData />
      ) : (
        <Button
          title="Request Permission"
          onPress={() => {
            RNCalendarEvents.requestPermissions(true).then(result => {
              Alert.alert('Read-only Auth requested', result);
              setIsPermission(result === 'authorized' ? true : false);
            });
          }}
        />
      )}
    </View>
  );
};

const CalendarText = memo(({ item }) => {
  return <Text>{item.toString()}</Text>;
});

const CalendarData = () => {
  const [calendarData, setCalendarData] = useState([]);

  const renderItem = useCallback(({ item }) => {
    return <CalendarText item={item} />;
  }, []);

  useEffect(() => {
    RNCalendarEvents.findCalendars().then(result => {
      setCalendarData(
        result.reduce((acc, cal) => {
          acc.push(cal.title);
          return acc;
        }, []),
      );
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={calendarData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const ImagePlaceHolder = ({ item }) => {
  return (
    <Image
      resizeMode="contain"
      style={{
        height: 240,
        aspectRatio: 1,
        alignSelf: 'center',
        marginBottom: 10,
      }}
      source={require('./assets/image.png')}
    />
  );
};

const MemorizedImagePicker = () => {
  const renderItem = useCallback(({ item }) => {
    return <ImagePlaceHolder item={item} />;
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={TenThousandArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const DummyVideo = memo(({ item }) => {
  return (
    <Video
      source={require('./assets/video.mp4')}
      style={{
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: 'black',
      }}
      resizeMode={'contain'}
      repeat
    />
  );
});

const MemorizedVideos = () => {
  const renderItem = useCallback(({ item }) => {
    return <DummyVideo item={item} />;
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[...Array(5)].fill(0)}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};
