import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import { collection, addDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  categoryId: string;
  onClose: () => void;
}

const AddContestantModal: React.FC<Props> = ({ categoryId, onClose }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async () => {
    if (!name || !file) {
      toast.error('Please fill out the form completely.');
      return;
    }
  
    if (!categoryId) {
      toast.error('No valid category selected.');
      return;
    }
  
    setLoading(true);
    console.log('Adding contestant to category ID:', categoryId);
  
    try {
      // Cloudinary Upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'contestant_images'); // 🔁 your preset name
      formData.append('folder', 'contestants'); // Optional: organize by folder
  
      const response = await fetch('https://api.cloudinary.com/v1_1/dqplvhieo/image/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (!data.secure_url) {
        throw new Error('Image upload failed');
      }
  
      const imageUrl = data.secure_url;
  
      // Firestore Save
      const categoryDocRef = doc(db, 'categories', categoryId);
      const contestantsCollectionRef = collection(categoryDocRef, 'contestants');
  
      const contestantDocRef = await addDoc(contestantsCollectionRef, {
        name,
        image: imageUrl,
        createdAt: new Date(),
      });
  
      console.log('Contestant added with ID:', contestantDocRef.id);
      toast.success('Contestant added successfully!');
      onClose();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to add contestant.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <Overlay>
        <Modal>
          <Title>Add Contestant</Title>
          <CategoryInfo>Adding to category ID: {categoryId}</CategoryInfo>
          <Input 
            placeholder="Enter contestant name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />

          <FileLabel htmlFor="imageUpload">Upload Image</FileLabel>
          <FileInput 
            id="imageUpload" 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
          />

          {preview && <ImagePreview src={preview} alt="Preview" />}

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Uploading...' : 'Add Contestant'}
          </Button>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </Modal>
      </Overlay>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default AddContestantModal;

// Styled Components (same as before)...


const Overlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h3`
  margin: 0;
  text-align: center;
  font-size: 1.5rem;
  color: #090b22;
`;

const CategoryInfo = styled.div`
  font-size: 0.8rem;
  color: #666;
  background: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
  text-align: center;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const FileLabel = styled.label`
  font-weight: 500;
  color: #090b22;
  margin-bottom: 0.25rem;
`;

const FileInput = styled.input`
  padding: 0.5rem;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-top: 0.5rem;
`;

const Button = styled.button<{ disabled?: boolean }>`
  padding: 0.75rem;
  background: ${(props) => (props.disabled ? '#aaa' : '#090b22')};
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${(props) => (props.disabled ? '#aaa' : '#1a1d4f')};
  }
`;

const CancelButton = styled.button`
  padding: 0.75rem;
  background: transparent;
  color: #090b22;
  border: 1px solid #090b22;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
`;