import { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import MyInput from "../MyElements/MyInput";
import $api from "../../../api/AxiosApi";
import { setName } from "../../../redux/popupSlice";

const ChangePassword = () => {
  const [naming, setNaming] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [error, setError] = useState<any>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const changePassword = async () => {
    try {
      if (newPass.length < 2) return setError("Слишком короткий пароль");
      if (newPass.length > 64) return setError("Слишком длинный пароль");
      await $api.put("/changepassword", { password: naming, newPassword: newPass });
      dispatch(setName(""));
    } catch (error: any) {
      setError(error.response?.data);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="createdir_menu">
      <div className="createdir_header">Введите данные</div>
      <div style={{ marginTop: "0px", height: "75px" }} className="createdir_input">
        <MyInput
          reference={inputRef}
          onChange={(val) => {
            setError("");
            setNaming(val);
          }}
          error={error ? true : false}
          type="text"
          placeholder="Старый пароль"
          value={naming}
          onKeyDown={(e) => {
            if (e.key === "Enter") inputRef2.current?.focus();
          }}
        />
        <MyInput
          reference={inputRef2}
          error={error}
          onChange={(val) => {
            setError("");
            setNewPass(val);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") changePassword();
          }}
          type="text"
          placeholder="Новый пароль"
          value={newPass}
        />
      </div>
      <button onClick={changePassword} className="createdir_action">
        Изменить
      </button>
    </div>
  );
};

export default ChangePassword;
