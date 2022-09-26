import { HeaderContainer } from "./styles";
import logoImg from '../../../public/images/logo.svg';
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header(){
    return (
        <HeaderContainer>
            <img src={logoImg} alt="" />
            <nav>
                <NavLink to="/" title="Timer"><Timer /></NavLink>
                <NavLink to="/history" title="Histórico"><Scroll /></NavLink>
            </nav>
        </HeaderContainer>
    )
}