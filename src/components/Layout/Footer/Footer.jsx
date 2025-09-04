
import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";
import { Link } from "react-router-dom";

export default function AppFooter() {
  return (
    <Footer container>
      <FooterCopyright href="#" by="omnia ibrahim" year={2025} />
      <FooterLinkGroup>
        <FooterLink as={Link} to="/">Home</FooterLink>
        <FooterLink as={Link} to="/profile">Profile</FooterLink>
        <FooterLink as={Link} to="/Login">Login</FooterLink>
        <FooterLink as={Link} to="/Register">register</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
