import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
   padding-top: 130px;
`;

const Title = styled.h1`
  color: #003366;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  gap: 10px;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  height: 40px;
`;

const TextArea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.5rem;
  height: 100px;
  width: 100%;
  // max-width:735px;
  // min-width: 500px;

  // @media(max-width: 768px){

  // max-width: 600px;
  // }
`;

const Button = styled.button`
  padding: 0.7rem 1.2rem;
  background-color: #003366;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 16px;
  &:hover {
    background-color: #004080;
  }
`;

const MapWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 450px;
`;

const ContactButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const IconButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.2rem;
  background-color: #003366;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 16px;
  text-decoration: none;
  &:hover {
    background-color: #004080;
  }
`;

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const churchPhone = "+2348012345678"; // Example Nigerian phone number
  const churchEmail = "contact@example-church.com";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, message });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <ContactContainer>
      <Title>Contact Us</Title>

      <ContactButtons>
        <IconButton href={`tel:${churchPhone}`}>
          <FontAwesomeIcon icon={faPhone} /> Call Us
        </IconButton>
        <IconButton href={`mailto:${churchEmail}`}>
          <FontAwesomeIcon icon={faEnvelope} /> Email Us
        </IconButton>
      </ContactButtons>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextArea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></TextArea>
        <Button type="submit">Send Message</Button>
      </Form>

      <MapWrapper>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.144305795147!2d5.161369773656247!3d7.337686413169562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10478d4aeed6c693%3A0xa7c90cc86ce566ab!2sUpon%20Mount%20Zion%20RM!5e0!3m2!1sen!2sng!4v1722897620110!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          // allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Church Location"
        ></iframe>
      </MapWrapper>
    </ContactContainer>
  );
};

export default Contact;
