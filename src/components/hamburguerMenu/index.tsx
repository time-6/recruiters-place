import MenuContainer from "./hamburguerMenu";
import Logo from "../../assets/Logo.svg";
import { useContext, useState } from "react";
import { iUser, WebContext } from "../../context/webcontext";
import { useNavigate, useParams } from "react-router-dom";
import { ListMock } from "../../mockList/devType";
import { v4 as uuid } from "uuid";
import techList from "../../mockList/devTechs.json";

const HamburguerMenu = () => {
  const [className, setClassName] = useState("Controls");
  const [classDev, setClassDev] = useState("ControlsDev");
  const { home } = useParams();
  const navigate = useNavigate();

  const menu = () => {
    if (className === "Controls") {
      setClassName("Controls active");
      setClassDev("ControlsDev");
    } else {
      setClassName("Controls");
      setClassDev("ControlsDev");
    }
  };

  const filterDev = () => {
    if (classDev === "ControlsDev") {
      setClassDev("ControlsDev active");
    } else setClassDev("ControlsDev");
  };

  const { setFilterDevelopers, allUsers, logOff, setLogOff } =
    useContext(WebContext);

  function handleLogout() {
    menu();
    setLogOff(true);
  }

  function goToPerfil() {
    menu();
    navigate("perfil");
  }
  function goToChat() {
    menu();
    navigate("chat");
  }

  function reset() {
    if (className === "Controls") {
      navigate("/home");
      setFilterDevelopers(
        allUsers?.filter((elem: iUser) => elem.isRecruiter === false)
      );
    } else {
      menu();
      navigate("/home");
      setFilterDevelopers(
        allUsers?.filter((elem: iUser) => elem.isRecruiter === false)
      );
    }
  }
  function handleFilter(event: string) {
    menu();
    const arrayfiltro: iUser[] | undefined = [] as iUser[] | undefined;
    allUsers?.map((elem: iUser) => {
      if (elem.tech) {
        const techs = Object.entries<boolean>(
          elem?.tech as { [s: string]: boolean } | ArrayLike<boolean>
        );
        techs?.filter((elemento: [string, boolean]) => {
          if (elemento[1]) {
            if (elem?.isRecruiter === false && elemento[0] === event) {
              arrayfiltro?.push(elem);
            }
          }
        });
      }
      setFilterDevelopers(arrayfiltro);
    });
  }
  function handleFilterDev(event: string) {
    menu();
    const arrayfiltro: iUser[] = [];
    allUsers?.map((elem: iUser) => {
      if (elem.cargo === event) {
        arrayfiltro.push(elem);
      }
    });

    setFilterDevelopers(arrayfiltro);
  }

  return (
    <MenuContainer>
      <nav id="navbar">
        <div className="NavContainer">
          <div className="MenuContainer">
            <img id="NavBrand" src={Logo} alt="" onClick={() => reset()} />
            <button id="MenuBtn" onClick={() => menu()}></button>
          </div>
          <div className="ControlsContainer">
            <div className={className}>
              <button onClick={() => goToPerfil()}>Perfil</button>
              <button onClick={() => goToChat()}>Mensagens</button>
              {home === "home" && (
                <>
                  <button onClick={() => filterDev()}>Encontrar Devs</button>
                  <section className={classDev}>
                    <h5>Tipo dev:</h5>
                    <ul className="devType">
                      {ListMock.map((devType) => (
                        <li key={uuid()}>
                          <button
                            id={devType}
                            onClick={(event) => {
                              handleFilterDev(
                                (event.target as HTMLButtonElement).id
                              );
                            }}
                          >
                            {devType}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <h5>Tecnologias:</h5>
                    <ul>
                      {techList &&
                        techList.map((devTech) => (
                          <li key={uuid()}>
                            <img
                              id={devTech.tech}
                              src={devTech.dir}
                              alt="devTech.tech"
                              onClick={(event) => {
                                handleFilter(
                                  (event.target as HTMLImageElement).id
                                );
                              }}
                            ></img>
                          </li>
                        ))}
                    </ul>
                  </section>
                </>
              )}
              <button onClick={() => handleLogout()}>Sair</button>
            </div>
          </div>
        </div>
      </nav>
    </MenuContainer>
  );
};

export default HamburguerMenu;
