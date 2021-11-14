import React from 'react';
import './Profile.css';

import {apiUrl} from "../../config";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../strore/store";
import avatarLogo from "../../assets/img/avatarLogo.svg";
import {NavLink} from "react-router-dom";
import {deleteAvatar, uploadAvatar} from "../../api/fileApi";

const Profile: React.FC = () => {

  const user: any = useSelector<StateType>(state => state.user.currentUser)

  const dispatch = useDispatch();

  const onChangeUpload = (event: React.ChangeEvent<any>) => {
    dispatch(uploadAvatar(event.target.files[0]))
  }

  const onClickDelete = () => {
    dispatch(deleteAvatar())
  }

  return (
    <div className='profile__container'>
      <div className={'profile__user-container'}>
        <div className={'profile__title'}>
          User Profile
        </div>
        <div className={'profile__avatar-row'}>
          <div className={'profile__avatar-container'}>
            <img
              src={user.avatar ? `${apiUrl}/${user.avatar}` : avatarLogo}
              className={'profile__avatar-container_ico'}
              alt=""
            />
            <div className={'profile__avatar_name'}>
              {user.name}
            </div>
          </div>
          <div className={'profile__avatar-button-row'}>
            <div className="profile__upload-button">
              <label htmlFor="profile-button-input" className="profile__upload-button_label">
                Upload user avatar
              </label>
              <input
                type="file"
                accept={'image/*'}
                id="profile-button-input"
                className="profile__upload-button_input"
                multiple={true}
                onChange={onChangeUpload}
              />
            </div>
            <button
              className={'profile__delete-button'}
              onClick={onClickDelete}
            >
              Delete user avatar
            </button>
          </div>
        </div>
        <NavLink to={'/'}>
          <div className={'profile__button-close'}>
            X
          </div>
        </NavLink>

      </div>
    </div>
  );
};

export default Profile;