import {
  View,
  Text,
  ScrollView,
  Button,
  Alert,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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
    <View>
      <Button onPress={handleStart} title="RUN" />
      <Benchmark
        component={Videos}
        samples={1}
        onComplete={handleComplete}
        ref={ref}
        timeout={1000000}
        type="mount"
      />
      {/* <TenThousandEmptyViews />
      <TenThousandTextFields />
      <HundredCalendarEvent />
      <ImagePicker /> */}
      {/* <Videos /> */}
    </View>
  );
};

export default App;



const TenThousandTextFields = () => {
  return (
    <View>
      <ScrollView>
        {[...Array(10000)].map((_, index) => (
          <Text key={index}>Hello World</Text>
        ))}
      </ScrollView>
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

const HundredCalendarEvent = () => {
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

const CalendarData = () => {
  const [calendarData, setCalendarData] = useState([]);

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
    <View>
      {calendarData.map((c, i) => (
        <Text key={i}>{c.toString()}</Text>
      ))}
    </View>
  );
};

const ImagePicker = () => {
  return (
    <View>
      <ScrollView>
        {[...Array(10000)].map((_, index) => (
          <Image
            key={index}
            resizeMode="contain"
            style={{
              height: 240,
              aspectRatio: 1,
              alignSelf: 'center',
              marginBottom: 10,
            }}
            source={require('./assets/image.png')}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const Videos = () => {
  return (
    <View>
      <ScrollView>
        {[...Array(5)].map((_, index) => (
          <Video
            key={index}
            source={require('./assets/video.mp4')}
            style={{
              width: '100%',
              aspectRatio: 16 / 9,
              backgroundColor: 'black',
            }}
            resizeMode={'contain'}
            repeat
          />
        ))}
      </ScrollView>
    </View>
  );
};
