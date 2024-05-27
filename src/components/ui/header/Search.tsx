import { useEffect, useState } from "react";
import FileService from "../../../services/FileService";
import "./Search.scss";
import { useAppDispatch } from "../../../hooks/redux";
import { setCurrentFiles, setLoading } from "../../../redux/fileSlice";
import useDebounce from "../../../hooks/useDebounce";

const Search = () => {
  const dispatch = useAppDispatch();
  const fetchFiles = useDebounce(500, handleChange);

  const tryFetch = (q: string) => {
    if (q.length > 0) {
      dispatch(setLoading(true));
      fetchFiles(q);
    } else {
      // отменить запрос в handleChange
      dispatch(setCurrentFiles([]));
      dispatch(setLoading(false));
    }
  };

  async function handleChange(val: string) {
    try {
      const response = await FileService.searchFiles(val);
      const data = response.data;
      dispatch(setCurrentFiles(data));
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    dispatch(setCurrentFiles([]));
  }, []);

  return (
    <div className="search">
      <input
        onChange={(e) => {
          tryFetch(e.target.value);
        }}
        className="search_input"
        type="text"
        placeholder="Введите запрос"
      />
    </div>
  );
};

export default Search;
