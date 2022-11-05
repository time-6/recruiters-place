import styled, { css } from "styled-components";

interface iFormStyled {
  step: 1 | 2;
}

const FormStyledVariant = {
  1: css`
    width: 60%;
    background: #f5f8fa;
    border: 2px solid #1da1f2;
    border-radius: 15px;
    max-width: 750px;
    min-height: 556px;
    height: auto;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    
  `,
  2: css`
    width: 60%;
    background: #f5f8fa;
    border: 2px solid #1da1f2;
    border-radius: 15px;
    max-width: 750px;
    min-height: 556px;
    height: auto;
    margin: 0 auto;
    padding: 2rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `,
};

export const BoxForm = styled.div<iFormStyled>`
  ${({ step }) => FormStyledVariant[step]}
`;