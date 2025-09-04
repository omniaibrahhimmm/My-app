import React from "react";
import Add from "../../../components/posts/Add";
import PostsList from "../../../components/posts/PostsList";
import ProfileData from "../../../components/Profile/ProfileData";
import { Helmet } from "react-helmet";

export default function Profile() {
  return (
    <>
      <Helmet>
        <title>Kudo | Profile</title>
        <meta name="description" content="profile" />
      </Helmet>
      <Add />
      <ProfileData />
      <PostsList isHome={false} />
    </>
  );
}
