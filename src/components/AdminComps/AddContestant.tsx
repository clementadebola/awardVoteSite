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
    
    try {
      // Cloudinary Upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'contestant_images');
      formData.append('folder', 'contestants');
  
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
      toast.success('🎉 Contestant added successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: '#4CAF50',
          color: 'white',
          borderRadius: '8px',
          fontSize: '16px',
        },
      });
      
      // Reset form
      setName('');
      setFile(null);
      setPreview(null);
      
      // Close modal after a short delay to show success state
      setTimeout(() => {
        onClose();
      }, 1000);
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to add contestant.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Overlay onClick={(e) => {
        // Close only if clicking the overlay background, not the modal itself
        if (e.target === e.currentTarget) onClose();
      }}>
        <Modal>
          <HeaderSection>
            <Title>Add Contestant</Title>
            <CategoryBadge>Category: {categoryId}</CategoryBadge>
          </HeaderSection>

          <FormSection>
            <FormGroup>
              <Label htmlFor="name">Contestant Name</Label>
              <Input 
                id="name"
                placeholder="Enter contestant name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="imageUpload">Contestant Image</Label>
              <FileInputContainer>
                <FileInputButton htmlFor="imageUpload">
                  {file ? 'Change Image' : 'Select Image'}
                </FileInputButton>
                <FileInputText>{file ? file.name : 'No file selected'}</FileInputText>
                <FileInput 
                  id="imageUpload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                />
              </FileInputContainer>
            </FormGroup>

            {preview && (
              <PreviewContainer>
                <ImagePreview src={preview} alt="Preview" />
              </PreviewContainer>
            )}
          </FormSection>

          <ButtonGroup>
            <SubmitButton 
              onClick={handleSubmit} 
              disabled={loading || !name || !file}
            >
              {loading ? (
                <ButtonContent>
                  <Spinner />
                  <span>Uploading...</span>
                </ButtonContent>
              ) : (
                'Add Contestant'
              )}
            </SubmitButton>
            <CancelButton onClick={onClose}>Cancel</CancelButton>
          </ButtonGroup>
        </Modal>
      </Overlay>
      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AddContestantModal;

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const Modal = styled.div`
  background: #fff;
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: modalFadeIn 0.3s ease-out;
  
  @media (max-width: 600px) {
    max-width: 100%;
    height: auto;
    max-height: 90vh;
    border-radius: 12px;
  }
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeaderSection = styled.div`
  padding: 1.5rem 2rem;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  
  @media (max-width: 600px) {
    padding: 1rem 1.5rem;
  }
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #090b22;
  font-weight: 700;
`;

const CategoryBadge = styled.div`
  display: inline-block;
  font-size: 0.8rem;
  color: #5a5d7a;
  background: #e9ecef;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  margin-top: 0.25rem;
  font-weight: 500;
`;

const FormSection = styled.div`
  padding: 1.5rem 2rem;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  
  @media (max-width: 600px) {
    padding: 1rem 1.5rem;
    max-height: calc(80vh - 200px);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #090b22;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: border 0.2s;
  
  &:focus {
    outline: none;
    border-color: #090b22;
    box-shadow: 0 0 0 3px rgba(9, 11, 34, 0.1);
  }
`;

const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FileInputButton = styled.label`
  background: #f0f2f5;
  color: #090b22;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #dee2e6;
  font-size: 0.9rem;
  transition: all 0.2s;
  
  &:hover {
    background: #e9ecef;
  }
`;

const FileInputText = styled.span`
  font-size: 0.9rem;
  color: #6c757d;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

const PreviewContainer = styled.div`
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eee;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  display: block;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid #eee;
  background: #f8f9fa;
  
  @media (max-width: 600px) {
    padding: 1rem 1.5rem;
    flex-direction: column;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Spinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const BaseButton = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: 600px) {
    width: 100%;
    padding: 0.9rem;
  }
`;

const SubmitButton = styled(BaseButton)<{ disabled?: boolean }>`
  background: ${(props) => (props.disabled ? '#adb5bd' : '#090b22')};
  color: white;
  border: none;
  flex: 1;
  opacity: ${(props) => (props.disabled ? '0.7' : '1')};
  
  &:hover {
    background: ${(props) => (props.disabled ? '#adb5bd' : '#151942')};
  }
`;

const CancelButton = styled(BaseButton)`
  background: transparent;
  color: #495057;
  border: 1px solid #ced4da;
  
  &:hover {
    background: #e9ecef;
  }
`;