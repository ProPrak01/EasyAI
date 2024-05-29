import axios from 'axios'
const BASE_URL = 'https://gen-api-psi.vercel.app/api/bardapi'

const getResponse = (userMsg,type)=>


    axios.get(BASE_URL+"?ques="+userMsg+"&personality="+type);

export default{
    getResponse 
}