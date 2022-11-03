import './Footer.scss';

export function Footer(){

    return (
        <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            {/* <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"></a> */}
            <span className="mb-3 mb-md-0 text-muted">Rent-A-Car</span>
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3"><a className="text-muted" href="#"></a></li>
                <li className="ms-3"><a className="text-muted" href="#"></a></li>
                <li className="ms-3"><a className="text-muted" href="#"></a></li>
            </ul>
        </div>
    )
}