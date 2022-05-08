import React, { useEffect, useState } from "react";
import { Page } from "../components/Page";
import { EditProfileBox } from "../components/EditProfileBox";
import { GetUserData } from "./api/users/UserData";

export default function Main() {

  const userData = GetUserData();

  return (
    <Page layout="0" userData={userData}>
      <EditProfileBox userData={userData}></EditProfileBox>
    </Page>
  );
}