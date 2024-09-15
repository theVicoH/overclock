import React, { SetStateAction, useContext, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "./Button";
import { ButtonVariants } from "../types/buttons";
import { Close } from "common/icons/mobile";
import IconButton from "./IconButton";
import InputComponent from "./Input";
import { colors } from "common/styles";
import { SocketContext } from "../context/socket";

type ModalProps = {
  active: boolean;
  setActive: React.Dispatch<SetStateAction<boolean>>;
};

const Modal = ({ active, setActive }: ModalProps) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);
  const socket = useContext(SocketContext)
  const checkLength = (value: string) => {
    if (value.length <= 50) {
      setValue(value);
    }
  };

  const createRace = async (
    vehicle_id: string,
    race_name: string | undefined
  ) => {
    setIsLoading(true);
    const data = {
      data: {
        vehicle_id,
        name: race_name,
      },
    };
    if (race_name !== undefined && race_name !== null) {
      console.log(data);
      const response = await fetch("https://api.clementpnn.com/race/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const results = await response.json();

      console.log(response.status);
      console.log(results);

      if (response.status === 201) {
        if (!socket) return
        // activating auto mode
        socket.send(JSON.stringify({ "cmd": 11, "data": 1 }))
        setIsLoading(false);
        setActive(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  if (!active) {
    return null;
  }

  return (
    <>
      <View style={styles.container}></View>
      {isLoading ? (
        <View testID="loading-indicator" style={styles.backgroundIndicator}>
          <ActivityIndicator
            color={colors.primary500}
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      ) : (
        <View
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            setModalWidth(width);
            setModalHeight(height);
          }}
          style={[
            styles.modal,
            {
              transform: [
                { translateX: -(modalWidth / 2) }, // Dynamically center horizontally
                { translateY: -(modalHeight / 2) }, // Dynamically center vertically
              ],
            },
          ]}
        >
          <View style={styles.titleExit}>
            <Text style={styles.title}>Create race</Text>
            <IconButton
              variant={ButtonVariants.Inline}
              icon={<Close stroke={colors.neutral200} />}
              onPress={() => setActive(false)}
            />
          </View>
          <View style={[{ paddingHorizontal: 16, paddingBottom: 16 }]}>
            <View style={styles.titleExit}>
              <Text style={styles.textColor}>Course name</Text>
              <Text style={styles.textColor}>
                {value ? value?.length : 0}/50
              </Text>
            </View>
            <View style={{ marginBottom: 8 }}>
              <InputComponent
                placeholder="Write here"
                value={value}
                setValue={checkLength}
              />
            </View>
            <Button
              fullWidth={true}
              onPress={() =>
                createRace("e9f997d8-3530-4c24-b29d-5f77c114861c", value)
              }
            >
              Create
            </Button>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral1000,
    opacity: 0.4,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#464646",
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: 10,
    width: 250,
    paddingTop: 8,
  },
  titleExit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.neutral50,
    paddingLeft: 16,
  },
  activityIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  backgroundIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textColor: {
    color: colors.neutral400,
  },
});

export default Modal;
