import React from 'react';

const AdminDashboard = () => (
	<div className="sidebar">
		<a href="index.html" className="sidebar__logo">
			<img src="img/logo.svg" alt="" />
		</a>
		<div className="sidebar__user">
			<div className="sidebar__user-img">
				<img src="img/user.svg" alt="" />
			</div>

			<div className="sidebar__user-title">
				<span>Admin</span>
				<p>John Doe</p>
			</div>

			<button className="sidebar__user-btn" type="button">
				<i className="icon ion-ios-log-out"></i>
			</button>
		</div>
		<div className="sidebar__nav-wrap">
			<ul className="sidebar__nav">
				<li className="sidebar__nav-item">
					<a href="index.html" className="sidebar__nav-link sidebar__nav-link--active"><i className="icon ion-ios-keypad"></i> <span>Dashboard</span></a>
				</li>

				<li className="sidebar__nav-item">
					<a href="catalog.html" className="sidebar__nav-link"><i className="icon ion-ios-film"></i> <span>Catalog</span></a>
				</li>

				<li className="sidebar__nav-item">
					<a href="users.html" className="sidebar__nav-link"><i className="icon ion-ios-contacts"></i> <span>Users</span></a>
				</li>

				<li className="sidebar__nav-item">
					<a href="comments.html" className="sidebar__nav-link"><i className="icon ion-ios-chatbubbles"></i> <span>Comments</span></a>
				</li>

				<li className="sidebar__nav-item">
					<a href="reviews.html" className="sidebar__nav-link"><i className="icon ion-ios-star-half"></i> <span>Reviews</span></a>
				</li>

				<li className="sidebar__nav-item">
					<a href="../main/index.html" className="sidebar__nav-link"><i className="icon ion-ios-arrow-round-back"></i> <span>Back to HotFlix</span></a>
				</li>
			</ul>
		</div>
	</div>
);

export default AdminDashboard;