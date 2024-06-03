import AuthService from "../../services/AuthService";
import { ISession } from "../../models/Auth.model";
import { useEffect, useState } from "react";
import "./Sessions.scss";
import Session from "./Session";
import UserSvg from "../../images/UsersSvg";

const Sessions = () => {
  const [sessions, setSessions] = useState<ISession[]>([]);

  const getSessions = async () => {
    const response = await AuthService.getSessions();
    setSessions(response.data);
  };

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <div className="sessions_cont">
      <div className="sessions_title">
        <UserSvg height="100%" />
        Ваши сеансы
      </div>
      <div className="sessions">
        {sessions.map((session, i) => (
          <Session key={i} session={session} i={i} sessions={sessions} setSessions={setSessions} />
        ))}
      </div>
    </div>
  );
};

export default Sessions;
