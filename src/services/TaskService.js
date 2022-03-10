import axios from 'axios'

const JSON_BIN_SECRET = import.meta.env.VITE_JSON_BIN_SECRET
const instance = axios.create({
    baseURL: 'https://api.jsonbin.io/b/622a3f7f0618276743733216',
    headers: { 'X-Master-Key': JSON_BIN_SECRET }
})

export async function getAll () {
    const res = await instance.get('/latest',)
    return res.data
}

export async function updateAll (newTasks) {
    await instance.put('/',newTasks)
}