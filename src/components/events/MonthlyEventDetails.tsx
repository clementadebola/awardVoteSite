import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const pageBackground = "#f0f4f8";

const EventDetailsContainer = styled.div`
  background-color: ${pageBackground};
  min-height: 100vh;
  padding: 2rem 0;
  position: relative;
   padding-top: 120px;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  position: relative;
  overflow: hidden;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }
`;

const EventImage = styled.img`
  width: 100%;
  max-width: 600px; 
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  margin: 1rem 0;

  @media (max-width: 768px) {
    width: 90%;
    margin: 1rem 0;
  }
`;

const TextSection = styled.div`
  width: 100%;
  max-width: 600px; 
  padding: 2rem;
  margin: 1rem 0;

  @media (max-width: 768px) {
    width: 90%;
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  margin: 0;
`;

const AnimatedDescription = styled.p`
  font-size: 1.25rem;
  color: #555;
  margin-top: 1rem;
  animation: ${keyframes`
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  `} 1s ease-in-out;
`;

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const FlyerSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FlyerImage = styled.img`
  width: 50%;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FlyerDetails = styled.div`
  width: 50%;
  padding: 2rem;
  background-color: rgba(0, 51, 102, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SpeakersSection = styled(Section)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const SpeakerCard = styled.div`
  width: 250px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SpeakerImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const WhyAttendSection = styled(Section)`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ReasonsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ReasonItem = styled.li`
  margin-bottom: 1rem;
  padding-left: 2rem;
  position: relative;

  &:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #0066cc;
  }
`;

const WhatToExpectSection = styled(Section)`
  background-color: #0066cc;
  color: white;
  border-radius: 10px;
`;

const ExpectationsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ExpectationItem = styled.li`
  margin-bottom: 1rem;
  padding-left: 2rem;
  position: relative;

  &:before {
    content: "•";
    position: absolute;
    left: 0;
    font-size: 1.5rem;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const AnimatedSection = styled.div`
  animation: ${fadeIn} 1s ease-in;
`;


interface Speaker {
  name: string;
  image: string;
  role: string;
}

interface EventData {
  id: string;
  title: string;
  date: string;
  backgroundImage: string;
  flyerImage: string;
  description: string;
  speakers: Speaker[];
  whyAttend: string[];
  whatToExpect: string[];
}

const MonthlyEventDetails: React.FC = () => {
  const [event, setEvent] = useState<EventData | null>(null);

  useEffect(() => {
    const eventDocRef = doc(db, 'events', 'monthly');
    const unsubscribe = onSnapshot(eventDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setEvent({ id: docSnapshot.id, ...docSnapshot.data() } as EventData);
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, []);

  if (!event) return <div>Loading...</div>;

  return (
    <EventDetailsContainer>
      <TopSection>
        <TextSection>
          <Title>{event.title}</Title>
          <AnimatedDescription>{event.description}</AnimatedDescription>
        </TextSection>
        <EventImage
          src={event.backgroundImage}
          alt={`${event.title} Background`}
        />
      </TopSection>

      <AnimatedSection>
        <FlyerSection>
          <FlyerImage src={event.flyerImage} alt={`${event.title} Flyer`} />
          <FlyerDetails>
            <h3>Event Details</h3>
            <p>{event.description}</p>
            <p>
              <strong>Date:</strong> {event.date}
            </p>
          </FlyerDetails>
        </FlyerSection>
      </AnimatedSection>

      <AnimatedSection>
        <SpeakersSection>
          <SectionTitle>Featured Speakers</SectionTitle>
          {event.speakers.map((speaker, index) => (
            <SpeakerCard key={index}>
              <SpeakerImage src={speaker.image} alt={speaker.name} />
              <h3>{speaker.name}</h3>
              <p>{speaker.role}</p>
            </SpeakerCard>
          ))}
        </SpeakersSection>
      </AnimatedSection>

      <AnimatedSection>
        <WhyAttendSection>
          <SectionTitle>Why Attend?</SectionTitle>
          <ReasonsList>
            {event.whyAttend.map((reason, index) => (
              <ReasonItem key={index}>{reason}</ReasonItem>
            ))}
          </ReasonsList>
        </WhyAttendSection>
      </AnimatedSection>

      <AnimatedSection>
        <WhatToExpectSection>
          <SectionTitle>What to Expect</SectionTitle>
          <ExpectationsList>
            {event.whatToExpect.map((expectation, index) => (
              <ExpectationItem key={index}>{expectation}</ExpectationItem>
            ))}
          </ExpectationsList>
        </WhatToExpectSection>
      </AnimatedSection>
    </EventDetailsContainer>
  );
};

export default MonthlyEventDetails;