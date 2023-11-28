import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { useStore } from 'modules/shared';

import {
  LogoutButtonWrapper,
  ProfileNameWrapper,
  ProfilePageHeader,
  ProfilePageWrapper,
} from '../components/Profile';

export function ProfilePage() {
  const { authStore, userStore } = useStore();
  const { authToken } = authStore;
  const { profile } = userStore;

  useEffect(() => {
    userStore.loadProfile();
  }, [authToken]);

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  if (!profile) return <div>Loading...</div>;

  return (
    <ProfilePageWrapper>
      <ProfilePageHeader>
        <Avatar
          src={profile.avatar}
          sx={{ width: 60, height: 60 }}
          style={{ border: '1px solid #aaa' }}
        />

        <ProfileNameWrapper>
          {profile.firstName} {profile.lastName}
        </ProfileNameWrapper>

        <LogoutButtonWrapper>
          <Button variant="outlined" onClick={() => authStore.logout()}>
            Logout
          </Button>
        </LogoutButtonWrapper>
      </ProfilePageHeader>

      <ImageGallery
        items={profile.photos.map(({ url }) => ({
          original: url,
          thumbnail: url,
        }))}
      />
    </ProfilePageWrapper>
  );
}

export default observer(ProfilePage);
