import styled, { keyframes } from 'styled-components';
import { FaChurch, FaBook, FaPray, FaCalendarAlt, FaUsers } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const PageContainer = styled.div`
  // max-width: 1200px;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  padding-top: 150px;
  color: #333;
  animation: ${fadeIn} 1s ease-out;


`;

const SectionTitle = styled.h2`
  color: #003366;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ServiceCard = styled.div`
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${slideIn} 0.5s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ServiceTitle = styled.h3`
  color: #003366;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  font-size: 1.5rem;

  svg {
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ServiceTime = styled.p`
  font-weight: bold;
  color: #666;
`;

const ServiceDescription = styled.p`
  margin-top: 1rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ProgramSection = styled.section`
  margin-bottom: 4rem;
`;

const ProgramTitle = styled.h3`
  color: #003366;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ProgramList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ProgramItem = styled.li`
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`;

const Services = () => {
  const weeklyServices = [
    { name: 'Sunday Worship Service', time: '9:00 AM', icon: <FaChurch />, description: 'Join us for a spirit-filled worship experience every Sunday morning.' },
    { name: 'Tuesday Bible Study', time: '5:00 PM', icon: <FaBook />, description: 'Dive deep into God\'s Word with our midweek Bible study sessions.' },
    { name: 'Friday Prayer Meeting', time: '5:30 PM', icon: <FaPray />, description: 'Come together for a powerful time of corporate prayer and intercession.' },
  ];

  const monthlyPrograms = [
    'Every First Saturday - Prophetic and Miracle Combine Sunday - 9:00AM Prompt',
    'Every First Monday - Good Monring Holy spirit',
    'First Wednessday - Jacob at Jacob Night',
   'Every First Thursday - Visitor Impact Programme(VIP) - 10:00PM Prompt',
    'Last Friday - General Deliverance Vigil - 10:00PM Prompt',
    'Every Second Saturday - Youth Enlightening Service (Yes)',
    'Every First Sunday - Combine Sunday - 9:00AM ',

  ];

  const annualEvents = [
    'Easter Celebration - April',
    'Vacation Bible School - July',
    'Church Anniversary - Octomber',
    'December Retreat - December 24th',
    'Youth Program - August',
  ];

  return (
    <PageContainer>
      <SectionTitle>Our Services and Programs</SectionTitle>

      <ServicesGrid>
        {weeklyServices.map((service, index) => (
          <ServiceCard key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            <ServiceTitle>{service.icon} {service.name}</ServiceTitle>
            <ServiceTime>{service.time}</ServiceTime>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceCard>
        ))}
      </ServicesGrid>

      <ProgramSection>
        <ProgramTitle><FaCalendarAlt /> Monthly Programs</ProgramTitle>
        <ProgramList>
          {monthlyPrograms.map((program, index) => (
            <ProgramItem key={index}>{program}</ProgramItem>
          ))}
        </ProgramList>
      </ProgramSection>

      <ProgramSection>
        <ProgramTitle><FaUsers /> Annual Events</ProgramTitle>
        <ProgramList>
          {annualEvents.map((event, index) => (
            <ProgramItem key={index}>{event}</ProgramItem>
          ))}
        </ProgramList>
      </ProgramSection>
    </PageContainer>
  );
};

export default Services;