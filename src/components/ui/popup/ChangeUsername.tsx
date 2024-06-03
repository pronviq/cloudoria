import { useEffect, useRef, useState } from "react";
import MyInput from "../MyElements/MyInput";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import $api from "../../../api/AxiosApi";
import { setUserProperty } from "../../../redux/userSlice";
import { setName } from "../../../redux/popupSlice";

const ChangeUsername = () => {
  const user = useAppSelector((s) => s.userReducer);
  const [naming, setNaming] = useState<string>(user.username);
  const [error, setError] = useState<any>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const changeUsername = async () => {
    try {
      const regex = /^[a-zA-Z]+$/;
      if (!regex.test(naming)) return setError("Запрещенные символы");
      if (naming.length < 2) return setError("Слишком короткое имя");
      if (naming.length > 32) return setError("Слишком длинное имя");
      await $api.put("/changeUsername", {
        username: naming,
      });
      dispatch(setUserProperty({ property: "username", value: naming }));
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
      <div className="createdir_header">Укажите новое имя</div>
      <div className="createdir_input">
        <MyInput
          reference={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") changeUsername();
          }}
          onChange={(val) => {
            setError("");
            setNaming(val);
          }}
          type="text"
          value={naming}
        />
        {error && <div className="createdir_error">{error}</div>}
      </div>
      <button onClick={changeUsername} className="createdir_action">
        Изменить
      </button>
    </div>
  );
};

export default ChangeUsername;
