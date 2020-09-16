import instance from "./instance";

// Mobx
import { decorate, observable } from "mobx";

class ReceiptStore {
  receipts = [];
  loading = true;

  fetchReceipts = async () => {
    try {
      const res = await instance.get("/receipts");
      this.receipts = res.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  };

  updateReceipt = async (updatedReceipt) => {
    try {
      const formData = new FormData();
      for (const key in updatedReceipt)
        formData.append(key, updatedReceipt[key]);
      await instance.put(`/receipts/${updatedReceipt.id}`, formData);
      const receipts = this.receipts.find(
        (receipt) => receipt.id === updatedReceipt.id
      );
      for (const key in updatedReceipt) receipts[key] = updatedReceipt[key];
    } catch (error) {
      console.log("ReceiptStore -> updateReceipt -> error", error);
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
