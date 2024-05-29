import React, { Dispatch, SetStateAction } from "react";
import { ISession } from "../../models/Auth.model";
import LinuxSvg from "../../images/LinuxSvg";
import AppleSvg from "../../images/AppleSvg";
import WindowsSvg from "../../images/WindowsSvg";
import AndroidSvg from "../../images/AndroidSvg";
import { getDate } from "../../utils/SessionUtil";
import AuthService from "../../services/AuthService";

interface ISess {
  session: ISession;
  i: number;
  sessions: ISession[];
  setSessions: Dispatch<SetStateAction<ISession[]>>;
}

const Session: React.FC<ISess> = ({ session, i, sessions, setSessions }) => {
  const terminateSession = async () => {
    try {
      const response = await AuthService.terminateSession(session.id);
      const newSessions = sessions.filter((s) => s.id !== sessions[i].id);
      setSessions(newSessions);
    } catch (error) {}
  };

  return (
    <div key={i} className="session">
      <div className="session_img">
        {session.os === "Linux" ? (
          <LinuxSvg />
        ) : session.os === "IOS" || session.os === "macOS" ? (
          <AppleSvg />
        ) : session.os === "Windows" ? (
          <WindowsSvg height="30px" />
        ) : session.os === "Android" ? (
          <AndroidSvg />
        ) : null}
      </div>
      <div className="session_about">
        <div className="session_ip">{session.ip}</div>
        <div className="session_info">
          {session.os} &#8226; {session.browser} &#8226; {getDate(session.timestamp)}
        </div>
      </div>
      {session.isCurrent ? (
        <div className="session_current">Активный</div>
      ) : (
        <button onClick={terminateSession} className="session_determine">
          Завершить сеанс
        </button>
      )}
    </div>
  );
};

export default Session;
