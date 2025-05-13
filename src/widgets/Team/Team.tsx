import { HashLink } from "react-router-hash-link";
import { useMedia } from "@/modules";
import { WithLoading } from "@/shared/Components/WithLoading/WithLoading";
import "./Team.style.scss";
import photo from "@/shared/assets/images/photo.png";

const Team = () => {
  const { data: mediaData, isLoading, isError } = useMedia();
  const team = mediaData?.filter((el) => el.category === "team");
  console.log('team', team);

  return (
    <WithLoading
      isLoading={isLoading}
      isError={isError}
      count={4}
    >
      <div className="mainContainer">
        <h2 className="title">Наша команда</h2>
        <div className="grid">
          {team?.map((el, index) => (
            <div key={index} className="card">
              <img src={el.src} alt={el.team_name} key={index} />
              <p className="caption">
                <span className="bold">{el.team_name}</span>
                <br />
                {el.team_job}
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
    </WithLoading>
  );
};

export default Team;