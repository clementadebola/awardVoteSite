import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import AddContestantModal from './AddContestant';

interface Category {
  id: string;
  name: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
      setCategories(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ListContainer>
      {categories.map(cat => (
        <CategoryCard key={cat.id}>
          <h4>{cat.name}</h4>
          <button onClick={() => setSelectedCategoryId(cat.id)}>Add Contestant</button>
        </CategoryCard>
      ))}

      {selectedCategoryId && (
        <AddContestantModal 
          categoryId={selectedCategoryId} 
          onClose={() => setSelectedCategoryId(null)} 
        />
      )}
    </ListContainer>
  );
};

export default CategoryList;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
`;

const CategoryCard = styled.div`
  background: #f2f2f2;
  padding: 1rem;
  border-radius: 12px;

  h4 {
    margin: 0 0 0.5rem 0;
  }

  button {
    padding: 0.4rem 1rem;
    background: #090b22;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
`;
