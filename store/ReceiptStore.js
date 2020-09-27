import { decorate, observable, computed } from "mobx";
import instance from "./instance";
import moment from "moment";
import authStore from "./authStore";
import folderStore from "./FolderStore";
class ReceiptStore {
  receipts = [];
  selectedReceipts = [];
  loading = true;

  fetchReceipts = async () => {
    try {
      const res = await instance.get("/receipts");
      this.receipts = res.data;
      this.receipts = this.receipts.sort((a, b) => (a.date < b.date ? 1 : -1));

      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  };

  createReceipt = async (newReceipt) => {
    try {

      console.log(",,,,,,,newReceipt", newReceipt);
      const formData = new FormData();
      for (const key in newReceipt) formData.append(key, newReceipt[key]);
     

      const res = await instance.post(
        `/folders/${newReceipt.folderId}/receipts`,

      );
      const newreceipt = { ...res.data, folder: { userId: authStore.user.id } };
      this.receipts.push(newreceipt);
      console.log(",,,,,,,res.data", res.data);
    } catch (error) {
      console.log("ReceiptStore -> createReceipt -> error ", error);
    }
  };

  updateReceipt = async (updatedReceipt) => {
    try {
      const formData = new FormData();
      for (const key in updatedReceipt)
        formData.append(key, updatedReceipt[key]);

      await instance.put(`/receipts/${updatedReceipt.id}`, updatedReceipt);
      const receipt = this.receipts.find(
        (receipt) => receipt.id === updatedReceipt.id
      );
      for (const key in updatedReceipt) receipt[key] = updatedReceipt[key];
    } catch (error) {
      console.log("ReceiptStore -> updateReceipt -> error", error);
    }
  };

  deleteReceipt = async (receiptId) => {
    console.log(".....receiptId", receiptId);
    try {
      await instance.delete(`/receipts/${receiptId}`);
      this.receipts = this.receipts.filter(
        (receipt) => receipt.id !== receiptId
      );
    } catch (error) {
      console.log("ReceiptStore -> deleteReceipt -> error ", error);
    }
  };

  get totalExpiredReceipt() {
    const dateBeforeWeek = moment(
      new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
    ).format("YYYY-MM-DD");

    const totalExpired = receiptStore.receipts
      .filter((receipt) => receipt.folder.userId === authStore.user.id) //get receipt of this user
      .filter((receipt) => receipt.expDate < dateBeforeWeek); //get receipt that is less than dateBeforeWeek
    const totalExpiredLength = totalExpired.length;

    return totalExpiredLength;
  }
}

decorate(ReceiptStore, {
  receipts: observable,
  loading: observable,
  selectedReceipts: observable,
  totalExpiredReceipt: computed,
});

const receiptStore = new ReceiptStore();
receiptStore.fetchReceipts();

export default receiptStore;
