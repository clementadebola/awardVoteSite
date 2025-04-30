import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Define the structure of timeLeft state using an interface
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC = () => {
  // Set the date for the award night (example: May 20, 2025, 8:00 PM)
  const awardDate = new Date('MAY 20, 2025 20:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = awardDate - now;
      
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <CountdownContainer>
      <TimeUnit>
        <TimeValue>{timeLeft.days}</TimeValue>
        <TimeLabel>Days</TimeLabel>
      </TimeUnit>
      <TimeUnit>
        <TimeValue>{timeLeft.hours}</TimeValue>
        <TimeLabel>Hours</TimeLabel>
      </TimeUnit>
      <TimeUnit>
        <TimeValue>{timeLeft.minutes}</TimeValue>
        <TimeLabel>Minutes</TimeLabel>
      </TimeUnit>
      <TimeUnit>
        <TimeValue>{timeLeft.seconds}</TimeValue>
        <TimeLabel>Seconds</TimeLabel>
      </TimeUnit>
    </CountdownContainer>
  );
};

export default Countdown;

const CountdownContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 2rem 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 0.8rem;
  }
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-width: 60px;
  }
`;

const TimeValue = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 12px;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.light};
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.8rem;
    padding: 0.8rem;
  }
`;

const TimeLabel = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.light};
  text-transform: uppercase;
  letter-spacing: 1px;
`;
