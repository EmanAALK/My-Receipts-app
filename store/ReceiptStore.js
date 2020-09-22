import { decorate, observable } from "mobx";
import instance from "./instance";

class ReceiptStore {
  receipts = [];
  loading = true;

  fetchReceipts = async () => {
    try {
      const res = await instance.get("/receipt");
      this.receipts = res.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  };

  createReceipt = async (newReceipt) => {
    try {
      const formData = new FormData();
      for (const key in newReceipt) formData.append(key, newReceipt[key]);
      console.log(",,,,,,,newReceipt", formData);

      const res = await instance.post(
        `/folder/${newReceipt.folderId}/receipt`,
        formData
      );
      this.receipts.push(res.data);
    } catch (error) {
      console.log("ReceiptStore -> createReceipt -> error ", error);
    }
  };

  updateReceipt = async (updatedReceipt) => {
    try {
      const formData = new FormData();
      for (const key in updatedReceipt)
        formData.append(key, updatedReceipt[key]);
      await instance.put(`/receipt/${updatedReceipt.id}`, formData);
      const receipts = this.receipts.find(
        (receipt) => receipt.id === updatedReceipt.id
      );
      for (const key in updatedReceipt) receipts[key] = updatedReceipt[key];
    } catch (error) {
      console.log("ReceiptStore -> updateReceipt -> error", error);
    }
  };

  deleteReceipt = async (receiptId) => {
    try {
      await instance.delete(`/receipt/${receiptId}`);
      this.receipts = this.receipts.filter(
        (receipt) => receipt.id !== receiptId
      );
    } catch (error) {
      console.log("ReceiptStore -> deleteReceipt -> error ", error);
    }
  };
}

decorate(ReceiptStore, {
  receipts: observable,
  loading: observable,
});

const receiptStore = new ReceiptStore();
receiptStore.fetchReceipts();

export default receiptStore;
