import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import MyInput from "../MyElements/MyInput";
import $api from "../../../api/AxiosApi";
import { setName } from "../../../redux/popupSlice";
import { initialState, setUser, setUserProperty } from "../../../redux/userSlice";

const ConfirmDelete = () => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>("");
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const deleteAccount = async () => {
    try {
      await $api.put("/deleteaccount", { password });
      dispatch(setName(""));
      dispatch(setUser(initialState));
    } catch (error: any) {
      console.log(error);

      setError(error.response?.data);
    }
  };

  useEffect(() => {
    passwordRef.current?.focus();
  }, []);

  return (
    <div className="createdir_menu">
      <div className="createdir_header">Введите пароль для удаления</div>
      <div className="createdir_input">
        <MyInput
          reference={passwordRef}
          onChange={(val) => {
            setError("");
            setPassword(val);
          }}
          type="text"
          value={password}
          error={error}
        />
      </div>
      <button onClick={deleteAccount} className="createdir_action">
        Удалить
      </button>
    </div>
  );
};

export default ConfirmDelete;
