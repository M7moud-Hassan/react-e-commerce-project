import { Link } from 'react-router-dom';
function UserCard(props){
    return(<>
        <div className='col-sm-12 col-md-6 col-lg-3 g-0  text-center rounded d-inline-block'>
            <div className=' pt-1 mb-4'>
            <div className=''>
                <img src={props.user.image} width="200px" height="200px"   className="rounded-pill  border border-1 border-dark p-1 "/>
            </div>
            <Link to={`/profile/12`} className="fw-bold nav-link fs-4 text-primary">{props.user.userName}</Link>
            <div className='mb-1'>
                <span className='fs-5'>{props.user.role} </span> - <span className={`${!props.user.isDeleted ? 'text-success' : 'text-muted'}`}>{props.user.isDeleted==true ? "InActive":"Active"}</span>
            </div>
            </div>
        </div>
    </>);
}
export default UserCard