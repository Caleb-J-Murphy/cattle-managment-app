import { useParams } from 'react-router-dom';

export const ViewAnimalPage = () => {
  const { id } = useParams<{ id: string }>(); // id is a string

  return (
    <div>
      <h1>Viewing Animal {id}</h1>
      {/* Use id to fetch the animal, e.g., useQuery or API call */}
    </div>
  );
};
