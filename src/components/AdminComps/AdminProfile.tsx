import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import avater from '../../assets/avater.jpeg'

const ProfileContainer = styled.div`
  background-color: #82A6CA;
   font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const ProfileContent = styled.div`
  padding: 24px;
  width: 100%
  align-item:center;
  min-height: 100vh;
`;

const ProfileCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const ProfileHeader = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 24px;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  margin-bottom: 8px;
  cursor:pointer;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a7bc8;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

const AdminProfile: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(`${avater}`);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic here
    console.log('Password changed');
  };

  return (
    <ProfileContainer>
      <ProfileContent>
        <ProfileCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProfileHeader>Admin Profile</ProfileHeader>
          <AvatarContainer>
            <Avatar src={avatar} alt="Admin Avatar" />
          </AvatarContainer>
          <ProfileForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="avatar">Change Avatar</Label>
              <Input type="file" id='avatar' hidden accept="image/*" onChange={handleAvatarChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">New Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </FormGroup>
            <Button type="submit">Update Profile</Button>
          </ProfileForm>
        </ProfileCard>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default AdminProfile;