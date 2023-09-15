import {Layout} from 'antd';
import AdminHeader from "./AdminHeader.jsx";
import {useState} from "react";
import FilesViewer from "./FilesViewer.jsx";
import ClassMaterialViewer from "./ClassMaterialViewer.jsx";

function AdminPage() {

    const [page, setPage] = useState(1);
    const aboba = (page) => {
        setPage(Number(page))
    }

return (



    <Layout>
        <AdminHeader callback={aboba}/>
        {page === 1 && <FilesViewer/>}
        {page === 2 && <ClassMaterialViewer/>}
        {page === 3 && <div>2</div>}
    </Layout>
  );
}


export default AdminPage
