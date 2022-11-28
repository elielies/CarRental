import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter, faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';
import './Footer.scss';

export function Footer(){

    return (
        // <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        //     {/* <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"></a> */}
        //     <span className="mb-3 mb-md-0 text-muted">Rent-A-Car</span>
        //     <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        //         <li className="ms-3"><a className="text-muted" href="#"></a></li>
        //         <li className="ms-3"><a className="text-muted" href="#"></a></li>
        //         <li className="ms-3"><a className="text-muted" href="#"></a></li>
        //     </ul>
        // </div>
        
        <div id='footer' >
            <div className='container'>
            <footer className='py-2'>
                <div className='row'>
                    <div className='col-6 col-md-2 mb-3'>
                        <h5>Information</h5>
                        <ul>
                            <li>Home</li>
                            <li>Offers</li>
                            <li>Comming soon</li>
                            <li>Rent</li>
                        </ul>
                    </div>
                    <div className='col-6 col-md-2 mb-3'>
                        <h5>Usefull links</h5>
                        <ul>
                            <li>Home</li>
                            <li>Offers</li>
                            <li>Comming soon</li>
                            <li>Rent</li>
                        </ul>
                    </div>
                    <div className='col-6 col-md-2 mb-3'>
                        <h5>Find us at</h5>
                        <ul className="list-unstyled d-flex icons">
                        <FontAwesomeIcon className='sm-icon' icon={faInstagram} />
                        <FontAwesomeIcon className='sm-icon' icon={faTwitter} />
                        <FontAwesomeIcon className='sm-icon' icon={faFacebook} />
                    </ul>
                    </div>
                    <div className='col-md-5 offset-md-1 mb-3'>
                        <form>
                            <h5>Subscribe to our newsletter</h5>
                            <p>Get monthly updates on our new offers</p>
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                                <button className="btn btn-primary btn-sub" type="button">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p>© 2022 Nitro, ООД. All rights reserved.</p>
                    </div>
            </footer>
            </div>
        </div>
    )
}