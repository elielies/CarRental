
import headerImg from'../../assets/hero.jpg'
import './Home.scss';

export function Home() {


    return (
        <div className='header-section'>
            <div className="tab-pane active" id="pic-1"><img id="header-image" src={headerImg} /></div>
            <div className="header-overlay">
                <h1>Nitro</h1>
                <h2>For the love of automobiles</h2>
            </div>
            <section id='vehicles-preview'>
                
            </section>
        </div>
    )
}