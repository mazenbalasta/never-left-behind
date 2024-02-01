import { copyrightSign } from "../assets/icons";
import { logo } from "../assets/images";
import { footerLinks, socialMedia } from "../constants";


const Footer = () => {
  return (
    <div style={{ position: "relative", bottom: 0, height:"100px", width: "100%" }}>
    <footer className='bg-gray-900'>
      <div className='flex justify-between items-start gap-20 flex-wrap max-lg:flex-col'>
        <div className='flex flex-col items-start'>
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

        <div className='flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap'>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className='text-2xl leading-normal font-medium mt-6 text-white'>
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li
                    className='mt-3 text-base leading-normal text-white-400 hover:text-gray-500'
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

      <div className='flex justify-center items-center gap-5 mt-8 mx-8'>
        {socialMedia.map((icon) => (
          <div
            className='flex justify-center items-center w-12 h-12 bg-white rounded-full'
            key={icon.alt}
          >
            <img src={icon.src} alt={icon.alt} width={24} height={24} />
          </div>
        ))}
      </div>

      <div className="flex justify-between text-white-400 max-sm:flex-col max-sm:itemes-center mx-8 mt-8">
        <div className="flex flex-1 justify-center items-center gap-2 cursor-pointer">
          <img
            src={copyrightSign}
            alt='copyright sign'
            width={20}
            height={20}
            className='rounded-full m-0'
          />
          <p>Copyright Veterans 'R Us. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
