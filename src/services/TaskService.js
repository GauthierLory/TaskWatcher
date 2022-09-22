import axios from "axios";

// const JSON_BIN_SECRET = import.meta.env.VITE_JSON_BIN_SECRET;

// Définition de l'instance en fonction des données en localstorage
let instance = null;
updateAxiosInstance();

export async function getAll() {
  const res = await instance.get("/latest");
  return res.data.record;
}

export async function updateAll(newTasks) {
  await instance.put("/", newTasks);
}

export async function updateAxiosInstance() {
  /* global localStorage */
  instance = axios.create({
    baseURL: "https://api.jsonbin.io/v3/b/" + localStorage.getItem("jsonBinID"),
    headers: { "X-Master-Key": localStorage.getItem("jsonBinKey") },
  });
}
