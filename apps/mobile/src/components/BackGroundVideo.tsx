import { colors } from "common/styles";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Video, {
  OnBufferData,
  OnLoadData,
  OnLoadStartData,
  OnVideoErrorData,
  VideoRef,
} from "react-native-video";

interface BackgroundVideoProps {
  children: React.ReactElement;
  active: boolean;
  url: string;
}

//test

const BackgroundVideoComponent = ({
  children,
  active,
  url,
}: BackgroundVideoProps) => {
  const videoRef = useRef<VideoRef>(null);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const background = {
    uri: url,
  };

  const onError = (errorData: OnVideoErrorData) => {
    setError(true);
    setIsInitialLoading(false);
    setIsBuffering(false);
    console.log("onError", errorData.error);
  };

  const onBuffer = (bufferData: OnBufferData) => {
    setIsBuffering(bufferData.isBuffering);
    console.log("onBuffer", bufferData.isBuffering);
  };

  const onLoad = (loadData: OnLoadData) => {
    setIsInitialLoading(false);
    console.log("onLoad", loadData);
  };

  const onLoadStart = (loadStartData: OnLoadStartData) => {
    setIsInitialLoading(true);
    console.log("onStartLoad", loadStartData);
  };

  if (!active) {
    return (
      <View testID="empty-section" style={styles.background}>
        {children}
      </View>
    );
  }

  if (active && error) {
    return (
      <View style={styles.background}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Erreur dans le chargement de la vidéo !
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.background}>
      {(isInitialLoading || isBuffering) && (
        <View testID="load-section" style={styles.backgroundIndicator}>
          <Text style={{ marginTop: 40, color: colors.neutral0 }}>
            Chargement...
          </Text>
          <ActivityIndicator
            color={colors.primary500}
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      )}
      <Video
        source={background}
        ref={videoRef}
        onBuffer={onBuffer}
        onError={onError}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        resizeMode="cover"
        repeat={true}
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 50000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000,
        }}
        style={styles.backgroundVideo}
        volume={0}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    backgroundColor: colors.neutral1000,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "auto",
  },
  backgroundIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: colors.neutral1000,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  activityIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default BackgroundVideoComponent;
