import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface Props {
  categoryId: string;
  onClose: () => void;
}

const AddContestantModal: React.FC<Props> = ({ categoryId, onClose }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async () => {
    if (!name || !image) return;
    await addDoc(collection(db, `categories/${categoryId}/contestants`), {
      name, image,
    });
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <h3>Add Contestant</h3>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
        <button onClick={handleSubmit}>Add</button>
        <button onClick={onClose}>Cancel</button>
      </Modal>
    </Overlay>
  );
};

export default AddContestantModal;

const Overlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center;
`;

const Modal = styled.div`
  background: white; padding: 2rem; border-radius: 12px;
  display: flex; flex-direction: column; gap: 1rem;

  input {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  button {
    padding: 0.5rem;
    background: #090b22;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:last-child {
      background: transparent;
      color: #090b22;
      border: 1px solid #090b22;
    }
  }
`;
