import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { RootState } from '../redux/store';
import { logout, setProfile } from '../redux/state/user';
import { ACCESS_TOKEN_LS_KEY, API_URL } from '../constants';
import styled from '@emotion/styled';

export function ProfilePage() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const profile = useSelector((state: RootState) => state.user.profile);

  useEffect(() => {
    if (!accessToken) return;

    fetch(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.status === 401) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => {
        dispatch(setProfile(data));
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (!profile) return <div>Loading...</div>;

  return (
    <PageWrapper>
      <Header>
        <Avatar
          src={profile.avatar}
          sx={{ width: 60, height: 60 }}
          style={{ border: '1px solid #aaa' }}
        />
        <NameWrapper>
          {profile.firstName} {profile.lastName}
        </NameWrapper>
        <LogoutBtnWrapper>
          <Button
            variant="outlined"
            onClick={() => {
              localStorage.removeItem(ACCESS_TOKEN_LS_KEY);
              dispatch(logout());
            }}
          >
            Logout
          </Button>
        </LogoutBtnWrapper>
      </Header>

      <ImageGallery
        items={profile.photos.map(({ url }) => ({
          original: url,
          thumbnail: url,
        }))}
      />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 40px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const NameWrapper = styled.div`
  margin-left: 8px;
  font-size: 20px;
`;

const LogoutBtnWrapper = styled.div`
  margin-left: auto;
`;

export default ProfilePage;
