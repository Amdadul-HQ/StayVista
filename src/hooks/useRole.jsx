import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { da } from "date-fns/locale";



const useRole = () => {
    const {user,loading} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data:role,isLoading} = useQuery({
        queryKey:['role'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const {data} = await axiosSecure.get(`user/${user?.email}`)
            return  data
        }
    })
    return [role,isLoading]
};

export default useRole;