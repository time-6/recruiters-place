import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm, UseFormReset } from "react-hook-form";
import { BiUserCircle } from "react-icons/bi";
import { SlPencil } from "react-icons/sl";
import { WebContext } from "../../context/webcontext";
import { SchemaPerfilRech } from "../../validations/schemas";
import { ButtonStylized } from "../buttons/style";
import Input from "../Input";
import { LogOffModal } from "../logoff";
import {
  Container,
  ContainerContent,
  ContainerMain,
  ContainerProfile,
  FormEditRech,
} from "./style";
import avatar from "../../assets/avatarTech.png";

export interface iEditRech {
  email: string;
  empresa: string;
  linkedin: string;
  city: string;
  name: string;
  password: string | undefined;
  reset: UseFormReset<iEditRech>;
}

const PerfilRech = () => {
  const { boxEdit, setBoxEdit } = useContext(WebContext);
  const { editSubmit, user } = useContext(WebContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<iEditRech>({
    resolver: yupResolver(SchemaPerfilRech),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      city: user?.city,
      linkedin: user?.linkedin,
      empresa: user?.empresa,
    },
  });

  return (
    <ContainerMain>
      <Container size="small">
        <ContainerProfile>
          <figure>
            <img src={avatar} alt="" />
          </figure>
          <div>
            <p>{user?.city}</p>
            <p>{user?.email}</p>
          </div>
        </ContainerProfile>
        <ContainerContent>
          <h2>{user?.name}</h2>
          {user?.empresa && <p>{user.empresa}</p>}
          {user?.linkedin && <a href={user?.linkedin}>Linkedin</a>}
        </ContainerContent>
        <SlPencil
          onClick={() => setBoxEdit(!boxEdit)}
          size={24}
          color="#1DA1F2"
          cursor="pointer"
        />
      </Container>
      {boxEdit && (
        <Container size="big">
          <FormEditRech onSubmit={handleSubmit((values) => editSubmit(values, reset))}>
            <Input
              id="name"
              type="text"
              label="Nome"
              register={register}
              getValues={getValues}
            />
            <Input
              id="city"
              type="text"
              label="Cidade"
              register={register}
              getValues={getValues}
            />
            <Input
              id="email"
              type="text"
              label="Editar email"
              register={register}
              getValues={getValues}
            />
            <Input
              id="password"
              type="password"
              label="Editar senha"
              register={register}
              getValues={getValues}
            />
            <Input
              id="empresa"
              type="text"
              label="Empresa"
              register={register}
              getValues={getValues}
            />
            <Input
              id="linkedin"
              type="text"
              label="Linkedin"
              register={register}
              getValues={getValues}
              errorMessage={errors.linkedin?.message}
            />
            <div className="box-btns">
              <ButtonStylized
                styled="medium"
                type="submit"
              >
                Finalizar
              </ButtonStylized>
              <ButtonStylized
                styled="medium"
                onClick={() => setBoxEdit(false)}
                type="button"
              >
                Cancelar
              </ButtonStylized>
            </div>
          </FormEditRech>
        </Container>
      )}
      <LogOffModal />
    </ContainerMain>
  );
};

export default PerfilRech;
