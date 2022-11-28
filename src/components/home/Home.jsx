import { Accordion, Button, Card, Carousel, ListGroup } from "react-bootstrap";
import headerImg from "../../assets/hero.jpg";
import carImg from "../../assets/route66-2.png"
import "./Home.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCoffee, faStar} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router";

export function Home() {
  const navigate = useNavigate();

  const toVehiclesHandler = () => {
    navigate('/vehicles');
  }

  return (
    <div>
        {/* header */}
        
      <div className="header-section">
        <div className="tab-pane active" id="pic-1">
          <img id="header-image" src={headerImg} />
        </div>
        <div className="header-overlay">
          <h1>Nitro</h1>
          <h2>For the love of automobiles</h2>
        </div>
      </div>
      {/* // end header */}

      <section className="toCars-section mt-5">
        <div className="container cars-container ">
        <div className="row">
          <div className="col my-auto">
            <h3>Find the perfect car to conquer the great outdoors</h3>
            <p>Go prepared in a rugged 4x4 to take on winter roads with ease, or a camper van to take you to the trees.</p>
            <Button onClick={toVehiclesHandler} className="btn btn-cars">Browse vehicles</Button>
          </div>
          <div className="col">
            <img id="header-image" src={carImg} />
          </div>
        </div>
        </div>
      </section>

      {/* // start reviews section */}
      <section class="pt-5 pb-5 reviews-section">
        <div class="container   ">
          <h1 class="mb-5 section-h1">Hear from our customers</h1>
          <div class="container">
            <div class="row gx-4">
                {/* // single card el */}
              <div class="col-sm-12 col-md-4">
                <Card className="mt-3 p-3 review-card">
                  <div className="row">
                    <div className="col-3">
                      <Card.Img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                        className="rounded-circle img-fluid shadow-1-strong"
                        alt="smaple image"
                        width="100"
                        height="100"
                      />
                    </div>
                    <div className="col-8 mt-3">
                      <Card.Title>Stella A.</Card.Title>
                      <Card.Subtitle>126 trips</Card.Subtitle>
                    </div>

                    <Card.Text className="mt-3">
                      <p>⭐⭐⭐⭐⭐</p>
                      Very punctual.
                    </Card.Text>
                  </div>
                </Card>
              </div>
              {/* // single card el */}
              <div class="col-sm-12 col-md-4">
                <Card className="mt-3 p-3  review-card">
                  <div className="row">
                    <div className="col-3">
                      <Card.Img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                        className="rounded-circle img-fluid shadow-1-strong"
                        alt="smaple image"
                        width="100"
                        height="100"
                      />
                    </div>
                    <div className="col-8 mt-3">
                      <Card.Title>Annie H.</Card.Title>
                      <Card.Subtitle>406 trips</Card.Subtitle>
                    </div>
                    <Card.Text className="mt-3">
                      <p>⭐⭐⭐⭐⭐</p>
                      Superb vehicles, the cars are always clean.
                    </Card.Text>
                  </div>
                </Card>
              </div>
              {/* // single card el */}
              <div class="col-sm-12 col-md-4">
                <Card className="mt-3 p-3  review-card">
                  <div className="row">
                    <div className="col-3">
                      <Card.Img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(3).webp"
                        className="rounded-circle img-fluid shadow-1-strong"
                        alt="smaple image"
                        width="100"
                        height="100"
                      />
                    </div>
                    <div className="col-8 mt-3">
                      <Card.Title>Mitko M.</Card.Title>
                      <Card.Subtitle>346 trips</Card.Subtitle>
                    </div>
                    <Card.Text className="mt-3">
                      <p>⭐⭐⭐⭐⭐</p>
                      Great service, greater people!
                    </Card.Text>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* // end reviews section  */}

      {/* // start faq section */}
      <div id="faq" className="container accordion-container">
        <h1 className="section-h1 mb-5">Frequently asked questions</h1>
        <Accordion className="faq-accordion" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header className="shadown-none">
              How to rent a car on Nitro?
            </Accordion.Header>
            <Accordion.Body>
              To rent a car on Nitro you must be a registered user on Nitro.com,
              be at least 18 years old and have a valid drivers license.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Can the car be delivered to me?</Accordion.Header>
            <Accordion.Body>
              Yes, you can request your car to be delivered to a specific
              address or an airport or a hotel.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Can I get a discount?</Accordion.Header>
            <Accordion.Body>
              Discounts get applied automaticaly based on the duration of your
              rental.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              What do I do if I have an accident?
            </Accordion.Header>
            <Accordion.Body>
              In the case of issues or emergencies call our emergency roadside
              assistance number.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    {/* // end faq section */}

    </div>
  );
}
