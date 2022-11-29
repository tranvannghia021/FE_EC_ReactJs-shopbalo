import Notiflix from 'notiflix';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookieClient, getCookiesClient, handleGetInformationClient } from '../../../api/Client/Auth/authAPI';
import { getStorageImage } from '../../../api/StorageImage';
import ProfileClient from '../../../components/client/Profile';
import ProfileEditClient from '../../../components/client/Profile/Edit';
import { BlockUI } from '../../../components/commons/Layouts/Notiflix';
import Skeleton from '../../../components/commons/Layouts/Skeleton';
import { isEditProfileSelector } from '../../../redux/selectors/profile/profile.selector';
export function ProfilePage(props) {
  const isEditProfile = useSelector(isEditProfileSelector);
  const [dataProfile, setDataProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetInforClient = async () => {
      const result = await handleGetInformationClient();
      if (result === 401) {
        handleSetUnthorization();
        setLoading(false);
        return false;
      } else if (result === 500) {
        return false;
        setLoading(false);
      } else {
        setDataProfile(result);
        setLoading(false);
      }
      // setLoading(false);
    };
    handleGetInforClient();
  }, [dispatch]);

  const backProfile = async () => {
    const result = await handleGetInformationClient();
    if (result === 401) {
      handleSetUnthorization();
      return false;
    } else if (result === 500) {
      return false;
    } else {
      setDataProfile(result);
    }
    setLoading(false);
  };
  const handleSetUnthorization = () => {
    const token = getCookiesClient('tokenClient');
    if (token) {
      deleteCookieClient('tokenClient');
    }
    window.location.href = '/login';
  };
  return (
    <section>
      <div className="container mt-5 padding-48px">
        <h5 className="text-danger font-weight-bold mb-3">
          {isEditProfile ? (
            <ProfileEditClient backProfile={backProfile} dataProfile={dataProfile} />
          ) : !loading ? (
            (Notiflix.Block.remove('#root'), (<ProfileClient dataProfile={dataProfile} />))
          ) : (
            BlockUI('#root', 'fixed')
          )}
        </h5>
      </div>
    </section>
  );
}
