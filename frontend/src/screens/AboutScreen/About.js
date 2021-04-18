import React, { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getAnnouncementById } from '../../actions/announcementAction';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import parse from 'html-react-parser';

const About = ({ history, match }) => {
  return (
    <Container>
      <Card>
        <Card.Header className='text-info' as='h2'>
          Overview of AABEA
        </Card.Header>
        <Card.Body>
          <section class='article-content clearfix' itemprop='articleBody'>
            <p className='text-justify'>
              <span>
                American Association of Bangladeshi Engineers and Architects,
                Inc., (AABEA) (www.aabea.org) is a non-profit professional
                organization established in 1984 and registered in the State of
                Pennsylvania. At present, it consists of 12 Chapters in various
                states/regions nationwide, and a Central Executive Committee,
                which rotates every two years among Chapters’ areas. The mission
                of the organization is to provide services to its members as
                well as greater Bangladeshi community in various areas in North
                America. The present Central Executive Committee (CEC) is
                located in Silicon Valley, California.&nbsp; All services
                provided under the auspices of AABEA are funded from generous
                contributions by its members and other community members.
              </span>
            </p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p className='text-justify'>
              <span>
                Some of the services that AABEA has provided during last few
                years are:
              </span>
            </p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <ol start='1'>
              <li className='text-justify'>
                <span>
                  Provided Career Development Services for Engineers,
                  Architects, and IT professionals through various workshops and
                  technical seminars;
                </span>
              </li>
              <li className='text-justify'>
                <span>
                  Provided Engineer-in- Training (EIT), Professional Engineering
                  (PE), and AutoCAD software training classes for Bangladeshi
                  American students and engineers;
                </span>
              </li>
              <li className='text-justify'>
                <span>
                  Provided various workshops for women to enhance their
                  participation and skills in workplace;
                </span>
              </li>
              <li className='text-justify'>
                <span>
                  Organized Science Fair and Art competitions for K1-12 students
                  annually as part of the youth development program;
                </span>
              </li>
              <li className='text-justify'>
                <span>
                  Providing limited scholarships for needy Bangladeshi students
                  in pursuing their college education{' '}
                </span>
              </li>
              <li className='text-justify'>
                <span>
                  AABEA has a job search sub-committee that continuously helps
                  job seekers to find jobs, to prepare resume and to enhance
                  interview skill;
                </span>
              </li>
              <li className='text-justify'>
                <span>
                  AABEA hosts various Job Fairs by inviting Federal agencies as
                  well as public and private enterprises.
                </span>
              </li>
            </ol>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p className='text-justify'>
              <span>
                In addition, AABEA offers educational and research support to
                improve technical education in Bangladesh so that their
                graduates can compete in the world market. &nbsp;AABEA, in
                collaboration with Intel Engineers and Intel Foundation’s
                matching grant, developed a new state-of-the-art computer&nbsp;
                lab at Bangladesh University of Engineering and Technology
                (BUET), Dhaka, and another at Chittagong University of
                Engineering &amp; Technology (CUET), Bangladesh. This effort
                included development of the laboratory, development of modem
                curricula for undergraduate engineering program and initiating
                Very Large Scale Integrated (VLSI) Circuit area graduate
                program. The cost of this program stood at $160,000.00 at BUET
                and $20,000 at CUET. AABEA also developed the Robert Noyce
                Simulation Lab (RNSL) and Linux Lab for BUET with necessary
                Ansoft SW design package license.&nbsp; AABEA also initiated a
                Joint Research Center for Advanced System Engineering (JRCASE)
                project to facilitate Education, Research &amp; Development
                (R&amp;D) on Very Large Scale Integrated (VLSI) Circuit at East
                West University (EWU), Dhaka, and at CUET, Bangladesh.&nbsp; So
                far, about $30,000.00 has been spent on this project
              </span>
            </p>
            <p>&nbsp;</p>

            <p className='text-justify'>
              <span>
                AABEA also developed the marketing tools for Bangladeshi IT
                companies to sell their products in US market places in
                collaboration with the World Bank.
              </span>
            </p>
            <p>&nbsp;</p>
            <p>
              <span></span>
            </p>
            <p>&nbsp;</p>
            <p className='text-justify'>
              <span>
                &nbsp;As for its humanitarian activities, AABEA raised funds to
                help the disaster-stricken areas of the world, including cyclone
                disasters in Bangladesh, earthquake in Haiti, and
                tsunami-devastated countries, in association with Salvation Army
                and Bangladesh Mission in USA to name a few.
              </span>
            </p>
          </section>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;
