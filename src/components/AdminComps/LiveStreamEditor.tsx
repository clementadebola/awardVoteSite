import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ref, set, get} from 'firebase/database';
import { database } from '../../firebase'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditorContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
    margin-top: 10px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const Button = styled(motion.button)<{ isLoading: boolean }>`
  background-color: ${props => props.isLoading ? '#7f8c8d' : '#3498db'};
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};
  font-size: 16px;
  width: 100%;
  transition: background-color 0.3s, opacity 0.3s;

  &:hover {
    background-color: ${props => props.isLoading ? '#7f8c8d' : '#2980b9'};
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 14px;
  }
`;

const LiveStreamEditor: React.FC = () => {
  const [streamLink, setStreamLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch the current stream link when the component mounts
    const fetchStreamLink = async () => {
      try {
        const streamLinkRef = ref(database, 'livestream-link');
        const snapshot = await get(streamLinkRef);
        if (snapshot.exists()) {
          setStreamLink(snapshot.val());
        } else {
          console.log('No stream link found.');
        }
      } catch (error) {
        console.error('Error fetching stream link:', error);
      }
    };

    fetchStreamLink();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await set(ref(database, 'livestream-link'), streamLink);
      toast.success('Stream link saved successfully!');
      setStreamLink('')
    } catch (error) {
      console.error('Error saving stream link:', error);
      toast.error('Failed to save stream link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EditorContainer>
      <Title>🎥 Live Stream Editor</Title>
      <Input
        type="text"
        value={streamLink}
        onChange={(e) => setStreamLink(e.target.value)}
        placeholder="Enter live stream link"
        disabled={isLoading}
      />
      <Button
        isLoading={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save Stream Link'}
      </Button>
      <ToastContainer />
    </EditorContainer>
  );
};

export default LiveStreamEditor;
