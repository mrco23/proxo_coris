import React from "react";
import { Outlet } from "react-router";

function AdminLayout() {
	return (
		<div>
			<p>admin layout</p>
			<Outlet />
		</div>
	);
}

export default AdminLayout;
