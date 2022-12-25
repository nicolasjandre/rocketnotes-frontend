import styled from "styled-components";

export const Container = styled.span`
    font-size: 1.2rem;
    padding: 5px 14px;
    border-radius: 5px;
    margin-right: 6px;
    background: ${({theme}) => theme.COLORS.ORANGE};
    color: ${({theme}) => theme.COLORS.BACKGROUND_900};
    margin-bottom: 1rem;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`