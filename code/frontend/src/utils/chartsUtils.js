import axios from 'axios';
import { getAuth } from 'firebase/auth';

export const getDataForFirstClicks = async () => {
    const auth = getAuth()
    const user = auth.currentUser
    try{
        const response = await axios.get("http://127.0.0.1:5000/getFirstClicksData", { params: { userId: user.uid }, })
        return response.data
    }catch(error){

    }
  }

export const getKeywordsData = async () => {
    const auth = getAuth()
    const user = auth.currentUser
    try{
        const response = await axios.get("http://127.0.0.1:5000/getKeywordData", { params: { userId: user.uid }, })
        return response.data
    }catch(error){

    }
}