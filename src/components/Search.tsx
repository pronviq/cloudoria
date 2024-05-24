import { useState } from "react";
import FileService from "../services/FileService";
import "./Search.scss";
import { useAppDispatch } from "../hooks/redux";
import { setCurrentFiles } from "../redux/fileSlice";
import useDebounce from "../hooks/useDebounce";

const Search = () => {
  const dispatch = useAppDispatch();
  const fetchFiles = useDebounce(1000, handleChange);
  async function handleChange(val: string) {
    const response = await FileService.searchFiles(val);
    const data = response.data;
    dispatch(setCurrentFiles(data));
  }

  return (
    <div className="search">
      <input
        onChange={(e) => {
          fetchFiles(e.target.value);
        }}
        className="search_input"
        type="text"
        placeholder="Введите запрос"
      />
    </div>
  );
};

export default Search;
