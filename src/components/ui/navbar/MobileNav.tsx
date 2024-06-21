import { Link } from "react-router-dom";
import "./MobileNav.scss";
import FilesSvg from "../../../images/FilesSvg";
import FavoriteSvg from "../../../images/FavoriteSvg";
import SearchSvg from "../../../images/SearchSvg";
import TrashSvg from "../../../images/TrashSvg";
import UploadSvg from "../../../images/UploadSvg";
import CreateSvg from "../../../images/CreateSvg";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setName } from "../../../redux/popupSlice";
import { ChangeEventHandler } from "react";
import { pushFile } from "../../../redux/fileSlice";
import { updateSize } from "../../../redux/userSlice";
import FileService from "../../../services/FileService";

const MobileNav = () => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector((state) => state.fileReducer.currentDir);
  const { disk_space, used_space } = useAppSelector((state) => state.userReducer);

  const usedSpacePercent = Math.ceil((100 / disk_space) * used_space);

  const handleUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      if (e.target.files) {
        const keys = Object.keys(e.target.files);
        keys.forEach(async (key) => {
          if (e.target.files) {
            const file = await FileService.uploadFile(e.target.files[Number(key)], currentDir);

            if (file) {
              const size = file.size;
              dispatch(updateSize(size));
              dispatch(pushFile(file));
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="mobilenav">
      <ul className="mobilenav_list">
        <li>
          <button>
            <Link className="mobilenav_list_item" to="/">
              <FilesSvg height="100%" />
              <p>Все файлы</p>
            </Link>
          </button>
        </li>
        <li>
          <button>
            <Link className="mobilenav_list_item" to="/favorites">
              <FavoriteSvg height="100%" />
              <p>Избранное</p>
            </Link>
          </button>
        </li>
        <li>
          <button>
            <Link className="mobilenav_list_item" to="/search">
              <SearchSvg height="100%" />
              <p>Поиск</p>
            </Link>
          </button>
        </li>
        <li className="circular">
          <div className="mobilenav_list_item">
            <div
              className="circular_progress"
              style={{
                background: `conic-gradient(rgb(157, 10, 255) ${
                  3.6 * usedSpacePercent
                }deg, rgba(0, 255, 0, 0.2) 0deg)`,
              }}
            >
              <div className="circular_percentage">
                {usedSpacePercent}
                <span>%</span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <button>
            <Link className="mobilenav_list_item" to="/trash">
              <TrashSvg height="100%" />
              <p>Корзина</p>
            </Link>
          </button>
        </li>
        <li>
          <input onChange={handleUpload} id="file_upload_mob" hidden={true} type="file" multiple />
          <button>
            <label htmlFor="file_upload_mob" className="mobilenav_list_item">
              <UploadSvg height="100%" />
              <p>Загрузить</p>
            </label>
          </button>
        </li>
        <li>
          <button onClick={() => dispatch(setName("directory"))}>
            <div className="mobilenav_list_item">
              <CreateSvg height="100%" />
              <p>Создать</p>
            </div>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
