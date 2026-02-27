import "./Layout.scss";
import { NavLink, Outlet } from "react-router-dom";


function Header() {

    return (
        <header className="nav-header">
            <div className="nav-header-text">
                <h1>World Autonomous</h1>
                <h1>Global University</h1>
                <h3>Education for All</h3>
            </div>
            <div className="nav-header-links">
                {/* <NavLink to="/trucks" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <span className="nav-header-link">Home</span>
                </NavLink>
                <NavLink to="/friends" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <span className="nav-header-link">Friends</span>
                </NavLink>
                <NavLink to="/logout" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <span className="nav-header-link">Logout</span>
                </NavLink> */}
            </div>
        </header>
    );
}

function Layout() {

    return (
        <>
        <nav>
            <Header />
        </nav>
        <main className="outlet-container">
            <Outlet />
        </main>
        </>
    );
}

export default Layout;