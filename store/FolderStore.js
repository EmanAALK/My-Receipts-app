import { decorate, observable } from "mobx";
import instance from "./instance";
import authStore from "./authStore";

class FolderStore {
  folders = [];
  loading = true;

  fetchFolder = async () => {
    //error handler
    try {
      const response = await instance.get("/folder");
      console.log("FolderStore -> fetchFolder -> error", response); // test to see where data come from
      this.folders = response.data;
      this.loading = false;
    } catch (error) {
      console.error("FolderStore -> fetchFolder -> error", error);
    }
  };

  createFolder = async (newFolder) => {
    try {
      const formData = new FormData();
      for (const key in newFolder) formData.append(key, newFolder[key]);
      const res = await instance.post(`/folder`, formData);
      this.folders.push({ ...res.data, receipts: [] }); //revise "receipts"
    } catch (error) {
      console.log("FolderStore -> createFolder -> error ", error);
    }
  };

  updateFolder = async (updatedFolder) => {
    try {
      const formData = new FormData();
      for (const key in updatedFolder) formData.append(key, updatedFolder[key]);
      await instance.put(`/folder/${updatedFolder.id}`, formData);
      const folder = this.folders.find(
        (folder) => folder.id === updatedFolder.id
      );
      for (const key in updatedFolder) folder[key] = updatedFolder[key];
    } catch (error) {
      console.log("FolderStore -> updateFolder -> error", error);
    }
  };

  deleteFolder = async (folderId) => {
    try {
      await instance.delete(`/folder/${folderId}`);
      this.folders = this.folders.filter((folder) => folder.id !== folderId);
    } catch (error) {
      console.log("FolderStore -> deleteFolder  -> error ", error);
    }
  };
}

decorate(FolderStore, {
  folders: observable,
  loading: observable,
});

const folderStore = new FolderStore();
folderStore.fetchFolder();
export default folderStore;
