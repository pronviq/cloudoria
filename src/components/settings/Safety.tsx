import React, { ChangeEventHandler } from "react";
import "./Safety.scss";
import SafetySvg from "../../images/SafetySvg";
import LockSvg from "../../images/LockSvg";
import EmailSvg from "../../images/EmailSvg";
import AtSvg from "../../images/AtSvg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import PencilSvg from "../../images/PencilSvg";
import FileService from "../../services/FileService";
import { updateAvatar } from "../../redux/userSlice";
import { setName } from "../../redux/popupSlice";
import UserService from "../../services/UserService";
import AvatarSvg from "../../images/AvatarSvg";

const Safety: React.FC = () => {
  const user = useAppSelector((s) => s.userReducer);
  const dispatch = useAppDispatch();

  const uploadAvatar: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      if (e.target.files) {
        const avatarPath = await FileService.uploadAvatar(e.target.files[0]);
        dispatch(updateAvatar(avatarPath));
        UserService.getAvatar();
      }
    } catch (error) {}
  };

  const handlePopup = (q: string) => {
    dispatch(setName(q));
  };

  return (
    <article className="safety_cont">
      <div className="safety_title">
        <SafetySvg height="100%" />
        Личные данные
      </div>
      <div className="safety">
        <input hidden={true} type="file" id="upload_avatar" onChange={uploadAvatar} />
        <div className="safety_avatar">
          {user.avatar !== "empty" ? (
            <img style={{ objectFit: "cover" }} src={user.avatar} alt="" />
          ) : (
            <AvatarSvg />
          )}
          <label className="label_for_avatar" htmlFor="upload_avatar" />
        </div>
        <ul className="safety_info">
          <li className="safety_item">
            <div className="safety_svg">
              <AtSvg height="100%" />
            </div>
            Имя
            <p>{user.username}</p>
            <button onClick={() => handlePopup("username")} className="safety_changebtn">
              <PencilSvg />
            </button>
          </li>
          <li className="safety_item">
            <div className="safety_svg">
              <EmailSvg height="100%" />
            </div>
            Почта
            <p>{user.email}</p>
            <button onClick={() => handlePopup("email")} className="safety_changebtn">
              <PencilSvg />
            </button>
          </li>
          <li className="safety_item">
            <div className="safety_svg">
              <LockSvg height="100%" />
            </div>
            Пароль
            <p>********</p>
            <button onClick={() => handlePopup("password")} className="safety_changebtn">
              <PencilSvg />
            </button>
          </li>
          <li className="safety_delete">
            <button onClick={() => handlePopup("delete")}>Удалить аккаунт</button>
          </li>
        </ul>
      </div>
    </article>
  );
};

export default Safety;
