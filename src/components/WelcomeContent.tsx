import React from "react";
import styled from "styled-components";
import { FaChurch, FaHeart, FaPray, FaHandsHelping } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import pastorImg from "../assets/pastor.png";

const WelcomeWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const WelcomeHeader = styled.h1`
  text-align: center;
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const WelcomeLayout = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: stretch;
  }
`;

const WelcomeText = styled.div`
  flex: 1;
  background-color: white;
`;

const PastorSection = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PastorImage = styled.img`
  width: 300px;
  height: 430px;
  max-width: 300px;
  border-radius: 50%;
  border: 5px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
`;

const PastorInfo = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const PastorName = styled.h3`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const PastorTitle = styled.p`
  color: #666;
  font-style: italic;
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: #ff6600;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-around;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #444;
`;

const ReadMoreButton = styled(Link)`
  display: inline-block;
  background-color: #ff6600;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e65c00;
  }
`;

const WelcomeContent: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <WelcomeWrapper>
      <WelcomeHeader>Welcome to Upon Mount Zion Revival Ministry</WelcomeHeader>
      <WelcomeLayout
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={animationVariants}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <PastorSection>
          <PastorImage src={pastorImg} alt="Pastor Dr. A.O. Igbekele" />
          <PastorInfo>
            <PastorName>Pastor Dr. A.O. Igbekele</PastorName>
            <PastorTitle>Senior Pastor & Founder</PastorTitle>
          </PastorInfo>
        </PastorSection>
        <WelcomeText>
          <IconWrapper>
            <FaChurch />
            <FaHeart />
            <FaPray />
            <FaHandsHelping />
          </IconWrapper>
          <h2>A Place of Revival and Transformation</h2>
          <Paragraph>
            Greetings in the name of our Lord Jesus Christ! I am Pastor Dr. A.O.
            Igbekele, welcoming you to Upon Mount Zion Revival Ministry. Our
            church is a vibrant community dedicated to experiencing and sharing
            God's transformative love.
          </Paragraph>
          <Paragraph>
            At Upon Mount Zion, we believe in the power of revival to ignite
            spiritual awakening. Through worship, Bible study, and outreach, we
            create an environment for encountering God's presence and fostering
            genuine spiritual growth.
          </Paragraph>
          <ReadMoreButton to="/ministry-history">Read More About Us</ReadMoreButton>
        </WelcomeText>
      </WelcomeLayout>
    </WelcomeWrapper>
  );
};

export default WelcomeContent;
