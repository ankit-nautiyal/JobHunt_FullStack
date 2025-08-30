import axios from "axios";
import store from "@/redux/store";
import { setUser } from "@/redux/authSlice";
import { persistor } from "@/main";


axios.defaults.withCredentials = true;  //Ensures cookies, authorization headers, and TLS client certificates are included in requests
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error?.response?.status === 401) {
            store.dispatch(setUser(null));  //logs the user out in Redux state
            await persistor.purge();  //clears the persisted Redux state (so no old auth info remains)
        }
        return Promise.reject(error);
    }
);

export default axios;