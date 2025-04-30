import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase'; 
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';

interface CandidateType {
  name: string;
  image?: string;
}

interface CategoryType {
  id: string;
  name: string;
  contestants: CandidateType[];
}

const AllCategoriesPage = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), async (snapshot) => {
      const categoriesData: CategoryType[] = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const categoryData = docSnap.data();
          const categoryId = docSnap.id;
  
          // Get contestants subcollection
          const contestantsSnapshot = await getDocs(collection(db, 'categories', categoryId, 'contestants'));
          const contestants: CandidateType[] = contestantsSnapshot.docs.map((contestantDoc) => {
            const data = contestantDoc.data();
            return {
              name: data.name,
              image: data.image || '', // default to empty string if image is missing
            };
          });
  
          return {
            id: categoryId,
            name: categoryData.name,
            contestants,
          };
        })
      );
  
      setCategories(categoriesData);
    });
  
    return () => unsubscribe();
  }, []);
  
  

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'categories', id));
      console.log('Category deleted:', id);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleDeleteContestant = async (categoryId: string, index: number) => {
    try {
      const categoryRef = doc(db, 'categories', categoryId);
      const category = categories.find((cat) => cat.id === categoryId);
      if (!category) return;

      const updatedContestants = [...category.contestants];
      updatedContestants.splice(index, 1);

      await updateDoc(categoryRef, {
        contestants: updatedContestants
      });
    } catch (error) {
      console.error('Error deleting contestant:', error);
    }
  };

  return (
    <Wrapper>
      <h2>All Categories & Contestants</h2>
      {categories.map((category) => (
        <CategoryCard key={category.id}>
          <CardHeader>
            <h3>{category.name}</h3>
            <DeleteButton onClick={() => handleDeleteCategory(category.id)}>Delete Category</DeleteButton>
          </CardHeader>
          <ContestantGrid>
            {category.contestants?.map((contestant, index) => (
              <ContestantCard key={index}>
                <ImageWrapper>
                  {contestant.image ? (
                    <img src={contestant.image} alt={contestant.name} />
                  ) : (
                    <Placeholder>{contestant.name.charAt(0)}</Placeholder>
                  )}
                </ImageWrapper>
                <span>{contestant.name}</span>
                <SmallDelete onClick={() => handleDeleteContestant(category.id, index)}>Delete</SmallDelete>
              </ContestantCard>
            ))}
          </ContestantGrid>
        </CategoryCard>
      ))}
    </Wrapper>
  );
};

export default AllCategoriesPage;

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;

  h2 {
    margin-bottom: 2rem;
    color: #090b22;
  }
`;

const CategoryCard = styled.div`
  margin-bottom: 2rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  background: #f8f9fa;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
  }
`;

const DeleteButton = styled.button`
  background: red;
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ContestantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ContestantCard = styled.div`
  text-align: center;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 0.5rem;
  border-radius: 50%;
  overflow: hidden;
  background: #ccc;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5rem;
  color: white;
  background: #666;
`;

const SmallDelete = styled.button`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: red;
  background: none;
  border: none;
  cursor: pointer;
`;
