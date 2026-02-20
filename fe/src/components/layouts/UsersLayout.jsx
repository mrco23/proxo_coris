import React from "react";
import { Outlet } from "react-router";
function UsersLayout() {
	return (
		<div>
			<p>user layout</p>
			<Outlet />
		</div>
	);
}

export default UsersLayout;
