
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/DashBoard/Sidebar/Sidebar';

const Dashboard = () => {
    return (
        <>
          <section className='flex'>
            <div>
                <Sidebar/>
            </div>  
            <div className='flex-1 md:ml-64'>
                <Outlet/>
            </div>  
          </section>  
        </>
    );
};

export default Dashboard;