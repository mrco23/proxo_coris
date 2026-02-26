import React from "react";
import { useParams } from "react-router-dom";

const UserDashboardPage = () => {
  const { user } = useParams();
  return <div>UserDashboardPage {user}</div>;
};

export default UserDashboardPage;
