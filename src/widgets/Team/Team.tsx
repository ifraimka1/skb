import "./Team.style.scss";
import photo from "@/shared/assets/images/photo.png";
import { HashLink } from "react-router-hash-link";

const Team = () => {
  const mockTeam = Array.from({ length: 7 }); // 7 обычных участников

  return (
    <div className="mainContainer">
      <h2 className="title">Наша команда</h2>
      <div className="grid">
        {mockTeam.map((_, index) => (
          <div key={index} className="card">
            <img src={photo} alt={`Член команды ${index + 1}`} />
            <p className="caption">
              <span className="bold">Владимир Кутковой</span>
              <br />
              руководитель СКБ «КИТ»
            </p>
          </div>
        ))}
        <HashLink smooth to="/contact" className="card">
          <div className="joinContent">
            <span className="joinText">Хочу в команду</span>
          </div>
          <p className="caption">
            <span className="bold"></span>
            <br /><br />
          </p>
        </HashLink>
      </div>
    </div>
  );
};

export default Team;