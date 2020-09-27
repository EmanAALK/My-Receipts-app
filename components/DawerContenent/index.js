import React from "react";
import { observer } from "mobx-react";

//Drawer
import { Title, Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

//Styling
import { View, StyleSheet } from "react-native";

//Icons
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";

//Stores
import authStore from "../../store/authStore";

//Theme
const IconColor = "#5C5C5C";

const DrawerContent = ({ navigation }) => {
  user = authStore.user;

  return (
    <>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView>
          <View style={styles.drawerContent}>
            <Drawer.Section
              style={(styles.drawerSection, { backgroundColor: "white" })}
            >
              <View style={styles.userInfoSection}>
                <View style={{ flexDirection: "column", marginLeft: 15 }}>
                  <Title
                    style={
                      (styles.title,
                      {
                        color: "black",
                        marginTop: 20,
                        marginBottom: 20,
                        alignContent: "flex-end",
                      })
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
                  <Icon name='account-outline' color='#5C5C5C' size={25} />
                )}
                label='Profile'
                onPress={() => {
                  navigation.navigate("Profile");
                }}
              />
            </Drawer.Section>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={() => <Icon name='receipt' color='#5C5C5C' size={25} />}
                label='Expenses Calculator'
                onPress={() => {
                  navigation.navigate("Calculation");
                }}
              />
            </Drawer.Section>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={() => (
                  <EvilIcons name='archive' size={30} color='#5C5C5C' />
                )}
                label='Archived Receipts'
                onPress={() => {
                  navigation.navigate("ArchiveReceipt");
                }}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>

        <Drawer.Section
          style={(styles.bottomDrawerSection, { paddingTop: 50 })}
        >
          <DrawerItem
            icon={() => <Icon name='exit-to-app' size={25} color='#5C5C5C' />}
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
    // backgroundColor: "lightgrey",
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
