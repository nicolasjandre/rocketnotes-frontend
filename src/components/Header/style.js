import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
    grid-area: header;

    height: 10.5rem;
    width: 100%;

    border-bottom: 1px solid ${({theme}) => theme.COLORS.BACKGROUND_700};

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 8rem;

    @media (max-width: 540px) {
        padding: 0 1rem;
    }
`

export const Profile = styled(Link)`
    display: flex;
    align-items: center;
    gap: 1rem;

    > img {
        width: 5.6rem; 
        height: 5.6rem;
        border-radius: 50%;
    }

    > div {
        display: flex;
        flex-direction: column;

        span {
        font-size: 1.4rem;
        color: ${({theme}) => theme.COLORS.GRAY_100};
        }
    
        strong {
            color: ${({theme}) => theme.COLORS.WHITE};
            font-size: 1.8rem;
        }
    }

    @media (max-width: 540px) {
        > img {
            width: 5rem;
            height: 5rem;
        }
        > div {
            span {
                font-size: 1rem;
            }

            strong {
                font-size: 1.4rem;
            }
        }
    }

`

export const Logout = styled.button`
    border: none;
    background: none;

    > svg {
        color: ${({theme}) => theme.COLORS.GRAY_100};
        font-size: 3.6rem;
    }

    @media (max-width: 540px) {
        > svg {
            font-size: 2.5rem;
        }
    }
`