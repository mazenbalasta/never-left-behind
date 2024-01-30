import { useNavigate } from 'react-router-dom';
import { useGetAllMessagesQuery } from '../../app/apiSlice'
import { Button } from '../../components'
import { arrowRight } from '../../assets/icons'


function Dashboard() {
  const { data: messages, isLoading, error } = useGetAllMessagesQuery();
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/messages/create');
  }

  const handleUpdate = (id) => {
    navigate(`/messages/${id}/update`);
  };

  const handleDelete = (id) => {
    navigate(`/messages/${id}/delete`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

return (
  <>
    <h1 className='mt-10 mb-10'>MESSAGES FOR VETERANS</h1>
    <div className='container mb-20'>
      <Button
        label='Create Message'
        icon={arrowRight}
        onClick={handleCreate}
      />
      {messages.map(message => (
        <div key={message.id} className='message-container'>
          <h3>{message.title}</h3>
          <p>{message.body}</p>
          <div className='button-container'>
            <Button
              label='Update'
              icon={arrowRight}
              onClick={() => handleUpdate(message.id)}
            />
            <Button
              label='Delete'
              icon={arrowRight}
              onClick={() => handleDelete(message.id)}
            />
          </div>
        </div>
      ))}
    </div>
  </>
);
};

export default Dashboard
