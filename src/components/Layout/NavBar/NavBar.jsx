import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../CounterContext/AuthContext";
import { useNavigate } from "react-router";

export default function AppNav() {
  const { token, setToken, userData } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/Login");
  }

  // for logout
  // lw fyh token eb2a na locked in
  return (
    <Navbar>
      <NavbarBrand as={Link} to="/">
        <span className="logo self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt={token ? userData?.name : "User"}
              img={
                token && userData?.photo
                  ? userData.photo
                  : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              }
              rounded
            />
          }
        >
          {token ? (
            <>
              {userData && (
                <DropdownHeader>
                  <span className="block text-sm">{userData.name}</span>
                  <span className="block truncate text-sm font-medium">
                    {userData.email}
                  </span>
                </DropdownHeader>
              )}
              <DropdownItem as={Link} to="/profile">
                profile
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem as={Link} to="/Login">
                Login
              </DropdownItem>
              <DropdownItem as={Link} to="/register">
                register
              </DropdownItem>
            </>
          )}
        </Dropdown>

        {token && <NavbarToggle />}
      </div>
      {token && (
        <NavbarCollapse>
          <NavbarLink to="/" active>
            Home
          </NavbarLink>
          <NavbarLink as={NavLink} to="#">
            Services
          </NavbarLink>
          <NavbarLink as={NavLink} to="#">
            Pricing
          </NavbarLink>
          <NavbarLink as={NavLink} to="#">
            Contact
          </NavbarLink>
        </NavbarCollapse>
      )}
    </Navbar>
  );
}
