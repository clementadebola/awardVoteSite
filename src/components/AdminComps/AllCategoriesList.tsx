import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';

interface ContestantType {
  id: string;
  name: string;
  image?: string;
}

interface CategoryType {
  id: string;
  name: string;
  contestants: ContestantType[];
}

const AllCategoriesPage = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), async (snapshot) => {
      try {
        const categoriesData: CategoryType[] = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const categoryData = docSnap.data();
            const categoryId = docSnap.id;

            // Get contestants subcollection
            const contestantsSnapshot = await getDocs(
              collection(db, 'categories', categoryId, 'contestants')
            );
            
            const contestants: ContestantType[] = contestantsSnapshot.docs.map((contestantDoc) => {
              const data = contestantDoc.data();
              return {
                id: contestantDoc.id,
                name: data.name,
                image: data.image || '',
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
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteCategory = async (id: string) => {
    try {
      // Create a batch operation
      const batch = writeBatch(db);
      
      // Get all contestants in this category
      const contestantsSnapshot = await getDocs(
        collection(db, 'categories', id, 'contestants')
      );
      
      // Add all contestant documents to batch delete
      contestantsSnapshot.docs.forEach((contestantDoc) => {
        const contestantRef = doc(db, 'categories', id, 'contestants', contestantDoc.id);
        batch.delete(contestantRef);
      });
      
      // Add category document to batch delete
      const categoryRef = doc(db, 'categories', id);
      batch.delete(categoryRef);
      
      // Commit the batch - this deletes everything in one operation
      await batch.commit();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleDeleteContestant = async (categoryId: string, contestantId: string) => {
    try {
      // Only delete the specific contestant document
      const contestantRef = doc(db, 'categories', categoryId, 'contestants', contestantId);
      await deleteDoc(contestantRef);
    } catch (error) {
      console.error('Error deleting contestant:', error);
    }
  };

  if (loading) {
    return (
      <LoadingWrapper>
        <LoadingSpinner />
        <p>Loading categories...</p>
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper>
      <PageHeader>
        <h1>Categories & Contestants</h1>
        <p>Manage all categories and contestants for your competition</p>
      </PageHeader>

      {categories.length === 0 ? (
        <EmptyState>
          <h3>No categories found</h3>
          <p>Create your first category to get started.</p>
        </EmptyState>
      ) : (
        <CategoriesGrid>
          {categories.map((category) => (
            <CategoryCard key={category.id}>
              <CardHeader>
                <CategoryTitle>{category.name}</CategoryTitle>
                <DeleteButton 
                  onClick={() => handleDeleteCategory(category.id)}
                  disabled={deleteLoading === `category-${category.id}`}
                >
                  {deleteLoading === `category-${category.id}` ? 'Deleting...' : 'Delete Category'}
                </DeleteButton>
              </CardHeader>
              
              {category.contestants.length === 0 ? (
                <EmptyContestants>No contestants in this category</EmptyContestants>
              ) : (
                <ContestantGrid>
                  {category.contestants.map((contestant) => (
                    <ContestantCard key={contestant.id}>
                      <ImageWrapper>
                        {contestant.image ? (
                          <img src={contestant.image} alt={contestant.name} />
                        ) : (
                          <Placeholder>{contestant.name.charAt(0).toUpperCase()}</Placeholder>
                        )}
                      </ImageWrapper>
                      <ContestantName>{contestant.name}</ContestantName>
                      <DeleteContestantButton 
                        onClick={() => handleDeleteContestant(category.id, contestant.id)}
                        disabled={deleteLoading === `contestant-${contestant.id}`}
                      >
                        {deleteLoading === `contestant-${contestant.id}` ? 'Deleting...' : 'Delete'}
                      </DeleteContestantButton>
                    </ContestantCard>
                  ))}
                </ContestantGrid>
              )}
            </CategoryCard>
          ))}
        </CategoriesGrid>
      )}
    </Wrapper>
  );
};

export default AllCategoriesPage;

// Styled Components
const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  
  h1 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const CategoryCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
`;

const CategoryTitle = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
`;

const DeleteButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ContestantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  padding: 1.25rem;
`;

const ContestantCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  transition: transform 0.15s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
  }
`;

const ImageWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 0.75rem;
  border: 3px solid white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

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
  font-size: 1.75rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
`;

const ContestantName = styled.span`
  font-weight: 500;
  text-align: center;
  margin-bottom: 0.7rem;
`;

const DeleteContestantButton = styled.button`
  background: none;
  color: #e74c3c;
  border: 1px solid #e74c3c;
  border-radius: 4px;
  padding: 0.3rem 0.7rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #e74c3c;
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyContestants = styled.div`
  padding: 2rem;
  text-align: center;
  color: #666;
  font-style: italic;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  p {
    color: #666;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  
  p {
    margin-top: 1rem;
    color: #666;
  }
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;