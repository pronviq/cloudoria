import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import MyInput from "../MyElements/MyInput";
import $api from "../../../api/AxiosApi";
import { setName } from "../../../redux/popupSlice";
import { setUserProperty } from "../../../redux/userSlice";

const ChangeEmail = () => {
  const user = useAppSelector((s) => s.userReducer);
  const [naming, setNaming] = useState<string>(user.email);
  const [error, setError] = useState<any>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const changeEmail = async () => {
    try {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(naming) || naming.length < 3) return setError("Некорректная почта");
      if (naming.length > 32) return setError("Слишком длинная почта");
      await $api.put("/changeEmail", {
        email: naming,
      });
      dispatch(setUserProperty({ property: "email", value: naming }));
      dispatch(setName(""));
    } catch (error: any) {
      setError(error.response?.data);

      // setError(error);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="createdir_menu">
      <div className="createdir_header">Укажите новую почту</div>
      <div className="createdir_input">
        <MyInput
          onKeyDown={(e) => {
            if (e.key === "Enter") changeEmail();
          }}
          reference={inputRef}
          onChange={(val) => {
            setError("");
            setNaming(val);
          }}
          type="text"
          value={naming}
        />
        {error && <div className="createdir_error">{error}</div>}
      </div>
      <button onClick={changeEmail} className="createdir_action">
        Изменить
      </button>
    </div>
  );
};

export default ChangeEmail;
