import HostRequestModal from "../../../components/Categories/Model/HostRequestModal";

const HostModal = ({isOpen,closeModal,modalHandler}) => {
    return (
        <>
         <HostRequestModal isOpen={isOpen} closeModal={closeModal} handleHostModal={modalHandler} ></HostRequestModal>   
        </>
    );
};

export default HostModal;