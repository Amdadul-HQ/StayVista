import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../Utils";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {

    const axiosSecure = useAxiosSecure()
    const{user} = useAuth()
    const [imagePriview,setImagePriview] = useState()
    const [imageText,setImageText] = useState('Upload Image')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const [dates,setDates] = useState( {
        startDate: new Date(),
        endDate: null,
        key: 'selection'
      })

    const handleDates = item => {
        setDates(item.selection)
    }


    const {mutateAsync} = useMutation({
        mutationFn: async roomData => {
            const { data } = await axiosSecure.post('/room',roomData)
            return data
        },
        onSuccess:()=> {
            toast.success('Room Added')
            setLoading(false)
            navigate('/dashboard/my-listings')
        }
    })


    const handleSubmit =async e => {
        e.preventDefault()
        setLoading(true)
        const form = e.target;
        const location = form.location.value;
        const title = form.title.value;
        const category = form.category.value;
        const price = form.price.value;
        const totalGuest = form.total_guest.value;
        const bedrooms = form.bedrooms.value;
        const bathrooms = form.bathrooms.value;
        const description = form.description.value;
        const image = form.image.files[0]
        const to = dates.endDate;
        const from = dates.startDate;
        const host = {
            name: user?.displayName,
            email:user?.email,
            image:user?.photoURL
        }
        try{
            const roomImage_url = await imageUpload(image)
            console.log(roomImage_url);
            const roomData = {
                location,
                title,
                category,
                price,
                totalGuest,
                bedrooms,
                bathrooms,
                description,
                to,
                from,
                host,
                image:roomImage_url,
            }
            
            await mutateAsync(roomData)
        }
        catch (error){
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Add room </h1>
            <AddRoomForm
            dates={dates}
            handleDates={handleDates}
            handleSubmit={handleSubmit}
            setImagePriview={setImagePriview}
            imagePriview={imagePriview}
            loading={loading}
            />
        </div>
    );
};

export default AddRoom;