import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { db, storage } from '../../firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditorContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const ImageInput = styled.div`
  margin-bottom: 10px;
`;

const ImageLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  box-sizing: border-box;
`;

const Button = styled(motion.button)<{ isLoading: boolean }>`
  background-color: ${props => props.isLoading ? '#7f8c8d' : '#2ecc71'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};
  width: 100%;
  opacity: ${props => props.isLoading ? 0.7 : 1};
  transition: background-color 0.3s, opacity 0.3s;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled(motion.button)<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.active ? '#2ecc71' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : 'black'};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

interface Speaker {
  name: string;
  image: string;
  role: string;
}

interface EventData {
  title: string;
  description: string;
  date: string;
  flyerImage: string;
  backgroundImage: string;
  speakers: Speaker[];
  whyAttend: string[];
  whatToExpect: string[];
}

const initialEventState: EventData = {
  title: '',
  description: '',
  date: '',
  flyerImage: '',
  backgroundImage: '',
  speakers: [{ name: '', image: '', role: '' }],
  whyAttend: [''],
  whatToExpect: ['']
};

const EventEditor: React.FC = () => {
  const [eventType, setEventType] = useState<'weekly' | 'monthly'>('weekly');
  const [weeklyEvent, setWeeklyEvent] = useState<EventData>(initialEventState);
  const [monthlyEvent, setMonthlyEvent] = useState<EventData>(initialEventState);
  const [isLoading, setIsLoading] = useState(false);

  const flyerInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const speakerImageInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const unsubscribeWeekly = onSnapshot(doc(db, 'events', 'weekly'), (doc) => {
      if (doc.exists()) {
        setWeeklyEvent(doc.data() as EventData);
      }
    });

    const unsubscribeMonthly = onSnapshot(doc(db, 'events', 'monthly'), (doc) => {
      if (doc.exists()) {
        setMonthlyEvent(doc.data() as EventData);
      }
    });

    // Cleanup function to unsubscribe from the listeners when the component unmounts
    return () => {
      unsubscribeWeekly();
      unsubscribeMonthly();
    };
  }, []);

  const currentEvent = eventType === 'weekly' ? weeklyEvent : monthlyEvent;
  const setCurrentEvent = eventType === 'weekly' ? setWeeklyEvent : setMonthlyEvent;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (index: number, field: 'whyAttend' | 'whatToExpect', value: string) => {
    setCurrentEvent(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const handleSpeakerChange = (index: number, key: keyof Speaker, value: string) => {
    setCurrentEvent(prev => {
      const newSpeakers = [...prev.speakers];
      newSpeakers[index] = { ...newSpeakers[index], [key]: value };
      return { ...prev, speakers: newSpeakers };
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, speakerIndex?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${eventType}/${field}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    if (field === 'speakerImage' && typeof speakerIndex === 'number') {
      handleSpeakerChange(speakerIndex, 'image', downloadURL);
    } else {
      setCurrentEvent(prev => ({ ...prev, [field]: downloadURL }));
    }
  };

  const clearImageInputs = () => {
    if (flyerInputRef.current) flyerInputRef.current.value = '';
    if (backgroundInputRef.current) backgroundInputRef.current.value = '';
    speakerImageInputRefs.current.forEach(input => {
      if (input) input.value = '';
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    const eventDocRef = doc(db, 'events', eventType);
    try {
      await setDoc(eventDocRef, currentEvent);
      console.log('Event saved:', { eventType, ...currentEvent });
      toast.success('Event saved successfully!');
      
      // Clear inputs
      setCurrentEvent(initialEventState);
      clearImageInputs();
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EditorContainer>
      <h2>📅 Event Editor</h2>
      <TabContainer>
        <Tab
          active={eventType === 'weekly'}
          onClick={() => setEventType('weekly')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Weekly Event
        </Tab>
        <Tab
          active={eventType === 'monthly'}
          onClick={() => setEventType('monthly')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Monthly Event
        </Tab>
      </TabContainer>
      <Input
        type="text"
        name="title"
        value={currentEvent.title}
        onChange={handleInputChange}
        placeholder="Event Title"
      />
      <TextArea
        name="description"
        value={currentEvent.description}
        onChange={handleInputChange}
        placeholder="Event Description"
      />
      <Input
        type="text"
        name="date"
        value={currentEvent.date}
        onChange={handleInputChange}
        placeholder="Event Date"
      />
      <ImageInput>
        <ImageLabel>Flyer Image:</ImageLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, 'flyerImage')}
          placeholder="Upload Flyer Image"
          ref={flyerInputRef}
        />
      </ImageInput>
      <ImageInput>
        <ImageLabel>Background Image:</ImageLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, 'backgroundImage')}
          placeholder="Upload Background Image"
          ref={backgroundInputRef}
        />
      </ImageInput>
      <h3>🎤 Speakers</h3>
      {currentEvent.speakers.map((speaker, index) => (
        <div key={index}>
          <Input
            type="text"
            value={speaker.name}
            onChange={(e) => handleSpeakerChange(index, 'name', e.target.value)}
            placeholder="Speaker Name"
          />
          <Input
            type="text"
            value={speaker.role}
            onChange={(e) => handleSpeakerChange(index, 'role', e.target.value)}
            placeholder="Speaker Role"
          />
          <ImageInput>
            <ImageLabel>Speaker Image:</ImageLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'speakerImage', index)}
              placeholder="Upload Speaker Image"
              ref={(el) => speakerImageInputRefs.current[index] = el}
            />
          </ImageInput>
        </div>
      ))}
      <h3>🌟 Why Attend</h3>
      {currentEvent.whyAttend.map((reason, index) => (
        <TextArea
          key={index}
          value={reason}
          onChange={(e) => handleArrayInputChange(index, 'whyAttend', e.target.value)}
          placeholder="Why Attend"
        />
      ))}
      <h3>🔮 What to Expect</h3>
      {currentEvent.whatToExpect.map((expectation, index) => (
        <TextArea
          key={index}
          value={expectation}
          onChange={(e) => handleArrayInputChange(index, 'whatToExpect', e.target.value)}
          placeholder="What to Expect"
        />
      ))}
      <Button
        isLoading={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
      >
        {isLoading ? 'Saving...' : 'Save Event'}
      </Button>
      <ToastContainer />
    </EditorContainer>
  );
};

export default EventEditor;
