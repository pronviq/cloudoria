import { CSSProperties } from "react";
import "./Background.scss";

const Background = () => {
  const bubbles = [
    10.7, 12.4, 12.5, 13.3, 10.1, 10.1, 14.1, 11.5, 12.1, 11.6, 14.4, 13.0, 14.8, 13.5, 10.5, 14.2,
    12.9, 14.8, 14.0, 13.4, 11.2, 14.3, 10.7, 12.4, 12.5, 13.3, 10.1, 10.1, 14.1, 11.5, 12.1,
  ];

  return (
    <div className="loginpage_bg">
      <div className="loginpage_bg-bubbles">
        {bubbles.map((b, i) => (
          <span key={i} style={{ "--i": b } as CSSProperties} className="loginpage_bg-bubble" />
        ))}
      </div>
    </div>
  );
};

export default Background;
