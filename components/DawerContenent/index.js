import React, { useState } from "react";
import { observer } from "mobx-react";

//Drawer
import { Title, Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

//Styling
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//Stores
import authStore from "../../store/authStore";

const DrawerContent = ({ navigation }) => {
  user = authStore.user;

  return (
    <>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView>
          <View style={styles.drawerContent}>
            <Drawer.Section
              style={
                (styles.drawerSection,
                { height: 90, backgroundColor: "#ffbf00" })
              }
            >
              <View style={styles.userInfoSection}>
                <View style={{ flexDirection: "column", marginLeft: 15 }}>
                  <Title
                    style={
                      (styles.title,
                      { color: "white", marginTop: 20, marginBottom: 20 })
                    }
                  >
                    {user.username}
                  </Title>
                </View>
              </View>
            </Drawer.Section>

            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={() => (
                  <Icon name='account-outline' color='grey' size='25' />
                )}
                label='Profile'
                onPress={() => {
                  navigation.navigate("Profile");
                }}
              />
            </Drawer.Section>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={() => <Icon name='receipt' color='grey' size='25' />}
                label='Receipts Calculator'
                onPress={() => {
                  navigation.navigate("Calculation");
                }}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>

        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={() => <Icon name='exit-to-app' size='25' />}
            label='Sign Out'
            onPress={() => {
              authStore.signout();
            }}
          />
        </Drawer.Section>
      </View>
    </>
  );
};
export default observer(DrawerContent);

//Drawer Styling
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
  },

  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },

  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 10,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
    height: 50,
    backgroundColor: "#e2cfc4",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  signin: {
    flexDirection: "row",
    marginTop: 15,
    fontWeight: "bold",
    color: "blue",
  },
});
