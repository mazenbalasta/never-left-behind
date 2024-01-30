import { useParams, useNavigate } from "react-router-dom"
import { useDeleteMessageMutation } from "../../app/apiSlice"
import { Button } from "../../components"
import { arrowRight } from "../../assets/icons"


function DeleteMessage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [deleteMessage, { isLoading }] = useDeleteMessageMutation();

    const handleDelete = async () => {
        await deleteMessage(id);
        navigate('/messages');
    };

    const handleCancel = () => {
        navigate('/messages');
    };

    if (isLoading)
        return <div>Loading...</div>
    
  return (
    <div>
        <h1>Confirm Deletion</h1>
        <p>Are you sure you want to delete this message?</p>
            <Button
                label='Delete'
                type='submit'
                size='medium'
                onClick={handleDelete}

            />
            <Button
                label='Cancel'
                size='medium'
                onClick={handleCancel}
            />
    </div>
  )
}

export default DeleteMessage
