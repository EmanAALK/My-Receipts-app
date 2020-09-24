import { decorate, observable } from "mobx";
import instance from "./instance";
import decode from "jwt-decode";
import Axios from "axios";

//Storage
import AsyncStorage from "@react-native-community/async-storage";
import folderStore from "./FolderStore";

class AuthStore {
  user = null;
  loading = true;

  setUser = async (token) => {
    await AsyncStorage.setItem("myToken", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
  };

  signup = async (userData) => {
    try {
      const res = await instance.post("/signup", userData);
      this.setUser(res.data.token); // await
      folderStore.folders.push(res.data.defaultFolder);
    } catch (error) {
      console.log("AuthStore -> signup -> error", error);
    }
  };

  signin = async (userData) => {
    try {
      const res = await instance.post("/signin", userData);
      await this.setUser(res.data.token);
    } catch (error) {
      console.log("AuthStore -> signin -> error", error);
    }
  };

  signout = () => {
    delete instance.defaults.headers.common.Authorization;
    this.user = null;
    AsyncStorage.removeItem("myToken");
  };

  checkForToken = async () => {
    const token = await AsyncStorage.getItem("myToken");
    if (token) {
      const decodedToken = decode(token);
      if (Date.now() < decodedToken.exp) {
        this.setUser(token); // await
      } else {
        this.signout();
      }
    }
  };

  updateUser = async (updatedUser) => {
    try {
      const formData = new FormData();

      for (const key in updatedUser) formData.append(key, updatedUser[key]);

      const res = await instance.put(`/`, formData);

      this.user = updatedUser;
    } catch (error) {
      console.error("AuthStore -> updatedUser -> error", error);
    }
  };
}
decorate(AuthStore, {
  user: observable,
  loading: observable,
});
const authStore = new AuthStore();
authStore.checkForToken();

export default authStore;
