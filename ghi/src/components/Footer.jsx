import { copyrightSign } from "../assets/icons";
import { logo } from "../assets/images";
import { footerLinks, socialMedia } from "../constants";


const Footer = () => {
  return (
    <footer className='px-8 py-8 bg-gray-900'>
      <div className='flex justify-between items-center gap-20 flex-wrap max-lg:flex-col'>
        <div className='flex flex-col items-center'>
          <a href='/'>
            <img
              src={logo}
              alt='logo'
              width={150}
              height={46}
              className='m-0'
            />
          </a>
          <p className='mt-6 text-base leading-7 text-white sm:max-w-sm'>
                Never Left Behind's focus is to enhance the lives of America's veterans by
                fostering connections with their community through a range of social and outdoor
                activities. Established in 2024, this organization is dedicated to integrating veterans
                into their local communities, promoting engagement and well-being through various
                outdoor and social events.
          </p>
          <div className='flex items-center gap-5 mt-8'>
            {socialMedia.map((icon) => (
              <div
                className='flex justify-center items-center w-12 h-12 bg-white rounded-full'
                key={icon.alt}
              >
                <img src={icon.src} alt={icon.alt} width={24} height={24} />
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap max-container'>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className='text-2xl leading-normal font-medium mb-6 text-white'>
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li
                    className='mt-3 text-base leading-normal text-white hover:text-red transition-colors duration-200'
                    key={link.name}
                  >
                    <a href={link.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center'>
        <div className='flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer'>
          <img
            src={copyrightSign}
            alt='copyright sign'
            width={20}
            height={20}
            className='rounded-full m-0'
          />
          <p className="text-white">Copyright Veterans 'R Us. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
