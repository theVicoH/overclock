import * as React from "react"
import { View, Text, StyleSheet, Button, ScrollView } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { HomeNavigationProperties } from "../types/navigation-properties"
import { Example } from "../types/api-example"
import { getPosts } from "../services/example"

export default function HomeScreen({ navigation }: HomeNavigationProperties) {
  const { data, status } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getPosts
  })
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      {status === "pending" ? (
        <Text>Loading...</Text>
      ) : status === "error" ? (
        <Text>Something went wrong</Text>
      ) : (
        <ScrollView>
          {data?.map((dataElement: Example) => (
            <View style={styles.postContainer} key={dataElement.id}>
              <Text>{dataElement.userId}</Text>
              <Text>{dataElement.id}</Text>
              <Text>{dataElement.title}</Text>
              <Text>{dataElement.body}</Text>
            </View>
          ))}
        </ScrollView>
      )}
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <Button
        title="Go to Abracadabra"
        onPress={() => navigation.navigate("Abracadabra")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  postContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d8dee4",
    borderRadius: 8,
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 12,
    color: "#e2e2e2"
  }
})
