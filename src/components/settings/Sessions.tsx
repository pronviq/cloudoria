import AuthService from "../../services/AuthService";
import { ISession } from "../../models/Auth.model";
import { useEffect, useState } from "react";
import "./Sessions.scss";
import Session from "./Session";

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
      <div className="sessions_bg" />
      <div className="sessions_title">Ваши сеансы:</div>
      <div className="sessions">
        {sessions.map((session, i) => (
          <Session session={session} i={i} sessions={sessions} setSessions={setSessions} />
        ))}
      </div>
    </div>
  );
};

export default Sessions;
