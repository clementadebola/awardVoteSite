import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface Props {
  onCategoryAdded: () => void;
}

const CategoryForm: React.FC<Props> = ({ onCategoryAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCategory = async () => {
    if (!name.trim() || !description.trim()) {
      alert('Please fill in both the category name and description.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'categories'), {
        name,
        description,
        createdAt: new Date(),
      });
      console.log('Category saved with ID:', docRef.id);
      alert('✅ Category added successfully!');
      setName('');
      setDescription('');
      onCategoryAdded();
    } catch (error: any) {
      console.error('❌ Firebase error:', error.message);
      alert('Failed to add category: ' + error.message);
    }
    
  };

  return (
    <Card>
      <Title>Add New Category</Title>
      <FieldGroup>
        <Label>Category Name</Label>
        <Input
          placeholder="e.g. Best Developer"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Description</Label>
        <TextArea
          placeholder="Describe this category..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </FieldGroup>
      <SubmitButton onClick={handleAddCategory}>Add Category</SubmitButton>
    </Card>
  );
};

export default CategoryForm;


const Card = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 0 auto 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h3`
  margin: 0;
  color: #090b22;
  font-size: 1.4rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.4rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #090b22;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
  min-height: 100px;
  resize: none;
  outline: none;

  &:focus {
    border-color: #090b22;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #090b22;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  align-self: flex-start;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: #121636;
  }
`;
